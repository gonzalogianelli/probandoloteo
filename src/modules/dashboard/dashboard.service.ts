import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Venta, VentaEstado } from "../venta/entities/venta.entity.js";
import { Pago, Moneda } from "../pago/entities/pago.entity.js";
import { ReporteService } from "../reporte/reporte.service.js";
import { today } from "../../common/utils/helpers.js";
@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Venta) private readonly ventas: Repository<Venta>,
    @InjectRepository(Pago) private readonly pagos: Repository<Pago>,
    private readonly reporte: ReporteService,
  ) {}
  async dashboard() {
    const rep = await this.reporte.reporteVentas();
    const ventas = await this.ventas.find({
      where: { estado: VentaEstado.ACTIVA },
    });
    const pagos = await this.pagos.find({ where: { fechaPago: today() } });
    return {
      statusCode: 200,
      message: "Dashboard obtenido correctamente",
      data: {
        ...rep.data,
        recaudacionHoy: pagos
          .filter((p) => p.moneda === Moneda.ARS)
          .reduce((a, p) => a + Number(p.importeTotal), 0),
        ventasActivas: ventas.length,
        fecha: today(),
      },
    };
  }
}
