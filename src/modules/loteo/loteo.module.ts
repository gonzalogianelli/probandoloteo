import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Loteo } from "./entities/loteo.entity.js";
import { LoteoController } from "./loteo.controller.js";
import { LoteoService } from "./loteo.service.js";

@Module({
  imports: [TypeOrmModule.forFeature([Loteo])],
  controllers: [LoteoController],
  providers: [LoteoService],
  exports: [LoteoService],
})
export class LoteoModule {}
