import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Venta, VentaEstado } from "./entities/venta.entity.js";
import { Lote, LoteEstado } from "../lote/entities/lote.entity.js";
import { PlanPago } from "../plan/entities/plan.entity.js";
import { User } from "../usuario/entities/user.entity.js";
import { Cuota, CuotaEstado } from "../cuota/entities/cuota.entity.js";
import { CreateVentaDto } from "./dto/create-venta.dto.js";
import { UpdateVentaDto } from "./dto/update-venta.dto.js";
import { ResponseDTO } from "../../common/dto/response.dto.js";
import { PaginationDto } from "../../common/dto/pagination.dto.js";
import { addMonths, money, today } from "../../common/utils/helpers.js";
import { ensureUpdateData, resolveOrder } from "../../common/utils/crud.js";

@Injectable()
export class VentaService {
  constructor(
    @InjectRepository(Venta) private readonly ventas: Repository<Venta>,
    @InjectRepository(Lote) private readonly lotes: Repository<Lote>,
    @InjectRepository(PlanPago) private readonly planes: Repository<PlanPago>,
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Cuota) private readonly cuotas: Repository<Cuota>,
    private readonly ds: DataSource,
  ) {}

  async findAll(q: PaginationDto, user?: any): Promise<ResponseDTO<any[]>> {
    const qb = this.ventas
      .createQueryBuilder("v")
      .leftJoinAndSelect("v.comprador", "comprador")
      .leftJoinAndSelect("v.vendedor", "vendedor")
      .leftJoinAndSelect("v.lote", "l")
      .leftJoinAndSelect("l.manzana", "m")
      .leftJoinAndSelect("v.planPago", "pp")
      .orderBy("v.id", "DESC")
      .skip(q.skip)
      .take(q.limit);
    if (user?.role === "CLIENTE")
      qb.andWhere("v.comprador_id = :compradorId", { compradorId: user.id });
    const data = await qb.getMany();
    return {
      statusCode: HttpStatus.OK,
      message: "Ventas obtenidas correctamente",
      data,
    };
  }

  async getById(id: number, user?: any): Promise<ResponseDTO<any>> {
    const v = await this.ventas.findOne({
      where: { id },
      relations: [
        "comprador",
        "vendedor",
        "lote",
        "lote.manzana",
        "lote.manzana.loteo",
        "planPago",
      ],
    });
    if (!v) throw new NotFoundException("Venta no encontrada");
    if (user?.role === "CLIENTE" && v.compradorId !== user.id)
      throw new BadRequestException("No podés consultar otra venta");
    const cuotas = await this.cuotas.find({
      where: { ventaId: id },
      order: { numero: "ASC" },
    });
    return {
      statusCode: HttpStatus.OK,
      message: "Venta obtenida correctamente",
      data: { ...v, cuotas },
    };
  }

  async create(dto: CreateVentaDto, user?: any): Promise<ResponseDTO<any>> {
    const comprador = await this.users.findOneBy({ id: dto.compradorId });
    if (!comprador)
      throw new BadRequestException("El comprador indicado no existe");
    const vendedorId = dto.vendedorId ?? Number(user?.id);
    if (!Number.isInteger(vendedorId) || vendedorId < 1)
      throw new BadRequestException("Debe indicarse un vendedor válido");
    const vendedor = await this.users.findOneBy({ id: vendedorId });
    if (!vendedor)
      throw new BadRequestException("El vendedor indicado no existe");
    const lote = await this.lotes.findOneBy({ id: dto.loteId });
    if (!lote) throw new BadRequestException("El lote indicado no existe");
    if (lote.estado === LoteEstado.VENDIDO)
      throw new BadRequestException("El lote ya está vendido");
    const plan =
      dto.planPagoId != null
        ? await this.planes.findOneBy({ id: dto.planPagoId })
        : null;
    if (dto.planPagoId != null && !plan)
      throw new BadRequestException("El plan de pago indicado no existe");
    const fechaVenta = dto.fechaVenta ?? today();
    const precioLista = money(dto.precioLista);
    const bonPct = money(dto.bonificacionPorcentaje ?? 0);
    const bonImp = money(
      dto.bonificacionImporte ?? (precioLista * bonPct) / 100,
    );
    const precioFinal = money(dto.precioFinal ?? precioLista - bonImp);
    const anticipo = money(dto.anticipo ?? 0);
    const financiado = money(dto.importeFinanciado ?? precioFinal - anticipo);
    const cantidad = Number(dto.cantidadCuotas ?? plan?.cantidadCuotas ?? 0);
    if (financiado < 0)
      throw new BadRequestException(
        "El importe financiado no puede ser negativo",
      );
    return this.ds
      .transaction(async (m) => {
        const venta = m.getRepository(Venta).create({
          compradorId: comprador.id,
          loteId: lote.id,
          vendedorId: vendedor.id,
          planPagoId: plan?.id ?? null,
          fechaVenta,
          fechaBoleto: dto.fechaBoleto ?? null,
          precioLista,
          bonificacionPorcentaje: bonPct,
          bonificacionImporte: bonImp,
          precioFinal,
          anticipo,
          importeFinanciado: financiado,
          cantidadCuotas: cantidad,
          formatoPago: dto.formatoPago ?? null,
          garante1: dto.garante1 ?? null,
          estado: dto.estado ?? VentaEstado.ACTIVA,
        });
        const saved = await m.getRepository(Venta).save(venta);
        if (cantidad > 0) {
          const importe = money(financiado / cantidad);
          for (let i = 1; i <= cantidad; i++) {
            const venc = addMonths(
              dto.fechaPrimerVencimiento ?? dto.fechaBoleto ?? fechaVenta,
              i,
            );
            await m.getRepository(Cuota).save(
              m.getRepository(Cuota).create({
                ventaId: saved.id,
                numero: i,
                fechaVencimiento: venc,
                importe,
                saldo: importe,
                estado: CuotaEstado.PENDIENTE,
              }),
            );
          }
        }
        lote.estado = LoteEstado.VENDIDO;
        await m.getRepository(Lote).save(lote);
        return saved.id;
      })
      .then((ventaId) => this.getById(ventaId, user));
  }

  async update(
    id: number,
    dto: UpdateVentaDto,
    user?: any,
  ): Promise<ResponseDTO<any>> {
    ensureUpdateData(dto);
    const v = await this.ventas.findOne({ where: { id } });
    if (!v) throw new NotFoundException("Venta no encontrada");
    if (user?.role === "CLIENTE" && v.compradorId !== user.id)
      throw new BadRequestException("No podés modificar otra venta");
    const allowed: any = { ...dto };
    delete allowed.fechaPrimerVencimiento;
    delete allowed.compradorId;
    delete allowed.loteId;
    delete allowed.vendedorId;
    Object.assign(v, allowed);
    try {
      await this.ventas.save(v);
      return this.getById(id, user);
    } catch (e: any) {
      if (e?.code === "ER_DUP_ENTRY")
        throw new BadRequestException(
          "Los datos de la venta generan un registro duplicado",
        );
      throw new InternalServerErrorException(
        "Error interno al actualizar la venta",
      );
    }
  }

  async remove(id: number): Promise<ResponseDTO> {
    const v = await this.ventas.findOne({ where: { id } });
    if (!v) throw new NotFoundException("Venta no encontrada");
    if (v.estado === VentaEstado.ACTIVA)
      throw new BadRequestException(
        "No se puede eliminar una venta activa; primero debe cancelarse o finalizarse",
      );
    try {
      await this.ventas.softRemove(v);
      return {
        statusCode: HttpStatus.OK,
        message: "Venta eliminada correctamente",
      };
    } catch {
      throw new InternalServerErrorException(
        "No se puede eliminar la venta porque tiene registros relacionados",
      );
    }
  }
}
