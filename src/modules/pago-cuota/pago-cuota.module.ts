import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PagoCuota } from "./entities/pago-cuota.entity.js";
import { PagoCuotaController } from "./pago-cuota.controller.js";
import { PagoCuotaService } from "./pago-cuota.service.js";

@Module({
  imports: [TypeOrmModule.forFeature([PagoCuota])],
  controllers: [PagoCuotaController],
  providers: [PagoCuotaService],
  exports: [PagoCuotaService],
})
export class PagoCuotaModule {}
