import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PagoMedio } from "./entities/pago-medio.entity.js";
import { PagoMedioController } from "./pago-medio.controller.js";
import { PagoMedioService } from "./pago-medio.service.js";

@Module({
  imports: [TypeOrmModule.forFeature([PagoMedio])],
  controllers: [PagoMedioController],
  providers: [PagoMedioService],
  exports: [PagoMedioService],
})
export class PagoMedioModule {}
