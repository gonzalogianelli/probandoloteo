import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Venta, VentaEstado } from "../venta/entities/venta.entity.js";
import { Cuota, CuotaEstado } from "../cuota/entities/cuota.entity.js";
import { Pago } from "../pago/entities/pago.entity.js";
import { User } from "../usuario/entities/user.entity.js";
import { ResponseDTO } from "../../common/dto/response.dto.js";

@Injectable()
export class CobranzaService {
  constructor(
    @InjectRepository(Venta) private readonly ventas: Repository<Venta>,
    @InjectRepository(Cuota) private readonly cuotas: Repository<Cuota>,
    @InjectRepository(Pago) private readonly pagos: Repository<Pago>,
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}
  async deudores(): Promise<ResponseDTO<any[]>> {
    const ventas = await this.ventas.find({
      where: { estado: VentaEstado.ACTIVA },
      relations: ["comprador", "lote", "planPago"],
    });
    const out: any[] = [];
    const now = new Date();
    for (const v of ventas) {
      const cuotas = await this.cuotas.find({
        where: { ventaId: v.id },
        order: { numero: "ASC" },
      });
      const venc = cuotas.filter(
        (c) =>
          Number(c.saldo) > 0 &&
          new Date(`${c.fechaVencimiento}T23:59:59`) < now,
      );
      const adeudado = cuotas.reduce((a, c) => a + Number(c.saldo), 0);
      if (venc.length || adeudado > 0)
        out.push({
          ventaId: v.id,
          compradorId: v.compradorId,
          comprador: `${v.comprador.nombre} ${v.comprador.apellido}`,
          dni: v.comprador.dni,
          lote: v.lote.codigo,
          plan: v.planPago?.nombre ?? v.formatoPago,
          cuotasPagadas: cuotas.filter((c) => c.estado === CuotaEstado.PAGADA)
            .length,
          cuotasPendientes: cuotas.filter((c) => Number(c.saldo) > 0).length,
          cuotasVencidas: venc.length,
          totalVencido: venc.reduce((a, c) => a + Number(c.saldo), 0),
          totalAdeudado: adeudado,
          ultimoVencimiento: venc[0]?.fechaVencimiento ?? null,
          estado: venc.length ? "Moroso" : "Pendiente",
        });
    }
    return {
      statusCode: 200,
      message: "Deudores obtenidos correctamente",
      data: out,
    };
  }
  async cuentaComprador(id: number, user?: any): Promise<ResponseDTO<any>> {
    if (user?.role === "CLIENTE" && user.id !== id)
      throw new UnauthorizedException("No podés consultar otra cuenta");
    const comprador = await this.users.findOneBy({ id });
    if (!comprador) throw new NotFoundException("Comprador no encontrado");
    const ventas = await this.ventas.find({
      where: { compradorId: id, estado: VentaEstado.ACTIVA },
      relations: ["lote", "lote.manzana", "lote.manzana.loteo", "planPago"],
    });
    const data = await Promise.all(
      ventas.map(async (v) => ({
        venta: v,
        cuotas: await this.cuotas.find({
          where: { ventaId: v.id },
          order: { numero: "ASC" },
        }),
        pagos: await this.pagos.find({
          where: { ventaId: v.id },
          order: { fechaPago: "ASC", id: "ASC" },
        }),
      })),
    );
    return {
      statusCode: 200,
      message: "Cuenta corriente obtenida correctamente",
      data: { comprador, ventas: data },
    };
  }
}
