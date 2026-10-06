import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Lote } from "../lote/entities/lote.entity.js";
import { CobranzaModule } from "../cobranza/cobranza.module.js";
import { ReporteController } from "./reporte.controller.js";
import { ReporteService } from "./reporte.service.js";
@Module({
  imports: [TypeOrmModule.forFeature([Lote]), CobranzaModule],
  controllers: [ReporteController],
  providers: [ReporteService],
  exports: [ReporteService],
})
export class ReporteModule {}
