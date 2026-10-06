import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Venta } from "./entities/venta.entity.js";
import { Lote } from "../lote/entities/lote.entity.js";
import { PlanPago } from "../plan/entities/plan.entity.js";
import { User } from "../usuario/entities/user.entity.js";
import { Cuota } from "../cuota/entities/cuota.entity.js";
import { VentaController } from "./venta.controller.js";
import { VentaService } from "./venta.service.js";
@Module({
  imports: [TypeOrmModule.forFeature([Venta, Lote, PlanPago, User, Cuota])],
  controllers: [VentaController],
  providers: [VentaService],
  exports: [VentaService],
})
export class VentaModule {}
