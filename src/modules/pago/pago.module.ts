import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pago } from "./entities/pago.entity.js";
import { PagoCuota } from "../pago-cuota/entities/pago-cuota.entity.js";
import { PagoMedio } from "../pago-medio/entities/pago-medio.entity.js";
import { Venta } from "../venta/entities/venta.entity.js";
import { Cuota } from "../cuota/entities/cuota.entity.js";
import { MedioPago } from "../medio/entities/medio.entity.js";
import { PagoController } from "./pago.controller.js";
import { PagoService } from "./pago.service.js";
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pago,
      PagoCuota,
      PagoMedio,
      Venta,
      Cuota,
      MedioPago,
    ]),
  ],
  controllers: [PagoController],
  providers: [PagoService],
  exports: [PagoService],
})
export class PagoModule {}
