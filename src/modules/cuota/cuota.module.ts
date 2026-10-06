import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cuota } from "./entities/cuota.entity.js";
import { CuotaController } from "./cuota.controller.js";
import { CuotaService } from "./cuota.service.js";

@Module({
  imports: [TypeOrmModule.forFeature([Cuota])],
  controllers: [CuotaController],
  providers: [CuotaService],
  exports: [CuotaService],
})
export class CuotaModule {}
