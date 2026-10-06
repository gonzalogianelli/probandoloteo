import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Manzana } from "./entities/manzana.entity.js";
import { ManzanaController } from "./manzana.controller.js";
import { ManzanaService } from "./manzana.service.js";

@Module({
  imports: [TypeOrmModule.forFeature([Manzana])],
  controllers: [ManzanaController],
  providers: [ManzanaService],
  exports: [ManzanaService],
})
export class ManzanaModule {}
