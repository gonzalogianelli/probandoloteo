import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Venta } from "../venta/entities/venta.entity.js";
import { Cuota } from "../cuota/entities/cuota.entity.js";
import { Pago } from "../pago/entities/pago.entity.js";
import { User } from "../usuario/entities/user.entity.js";
import { CobranzaController } from "./cobranza.controller.js";
import { CobranzaService } from "./cobranza.service.js";
@Module({
  imports: [TypeOrmModule.forFeature([Venta, Cuota, Pago, User])],
  controllers: [CobranzaController],
  providers: [CobranzaService],
  exports: [CobranzaService],
})
export class CobranzaModule {}
