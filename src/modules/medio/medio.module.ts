import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MedioPago } from "./entities/medio.entity.js";
import { MedioController } from "./medio.controller.js";
import { MedioService } from "./medio.service.js";

@Module({
  imports: [TypeOrmModule.forFeature([MedioPago])],
  controllers: [MedioController],
  providers: [MedioService],
  exports: [MedioService],
})
export class MedioModule {}
