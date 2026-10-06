import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Venta } from "../venta/entities/venta.entity.js";
import { Pago } from "../pago/entities/pago.entity.js";
import { ReporteModule } from "../reporte/reporte.module.js";
import { DashboardController } from "./dashboard.controller.js";
import { DashboardService } from "./dashboard.service.js";
@Module({
  imports: [TypeOrmModule.forFeature([Venta, Pago]), ReporteModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
