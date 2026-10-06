import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoteServicio } from "./entities/lote-servicio.entity.js";
import { LoteServicioController } from "./lote-servicio.controller.js";
import { LoteServicioService } from "./lote-servicio.service.js";
import { Lote } from "../lote/entities/lote.entity.js";
import { Servicio } from "../servicio/entities/servicio.entity.js";

@Module({
  imports: [TypeOrmModule.forFeature([LoteServicio, Lote, Servicio])],
  controllers: [LoteServicioController],
  providers: [LoteServicioService],
  exports: [LoteServicioService],
})
export class LoteServicioModule {}
