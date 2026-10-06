var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cuota } from "./entities/cuota.entity.js";
import { CuotaController } from "./cuota.controller.js";
import { CuotaService } from "./cuota.service.js";
let CuotaModule = class CuotaModule {
};
CuotaModule = __decorate([
    Module({
        imports: [TypeOrmModule.forFeature([Cuota])],
        controllers: [CuotaController],
        providers: [CuotaService],
        exports: [CuotaService],
    })
], CuotaModule);
export { CuotaModule };
//# sourceMappingURL=cuota.module.js.map