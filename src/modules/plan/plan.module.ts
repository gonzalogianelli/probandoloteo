import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlanPago } from "./entities/plan.entity.js";
import { PlanController } from "./plan.controller.js";
import { PlanService } from "./plan.service.js";

@Module({
  imports: [TypeOrmModule.forFeature([PlanPago])],
  controllers: [PlanController],
  providers: [PlanService],
  exports: [PlanService],
})
export class PlanModule {}
