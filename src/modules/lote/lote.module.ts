import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Lote } from "./entities/lote.entity.js";
import { LoteServicio } from "../lote-servicio/entities/lote-servicio.entity.js";
import { Manzana } from "../manzana/entities/manzana.entity.js";
import { Servicio } from "../servicio/entities/servicio.entity.js";
import { Venta } from "../venta/entities/venta.entity.js";
import { LoteController } from "./lote.controller.js";
import { LoteService } from "./lote.service.js";
@Module({
  imports: [
    TypeOrmModule.forFeature([Lote, LoteServicio, Manzana, Servicio, Venta]),
  ],
  controllers: [LoteController],
  providers: [LoteService],
  exports: [LoteService],
})
export class LoteModule {}
