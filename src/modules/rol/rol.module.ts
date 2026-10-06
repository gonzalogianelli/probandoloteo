import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./entities/rol.entity.js";
import { RolController } from "./rol.controller.js";
import { RolService } from "./rol.service.js";

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolController],
  providers: [RolService],
  exports: [RolService],
})
export class RolModule {}
