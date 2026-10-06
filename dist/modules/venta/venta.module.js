var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Venta } from "./entities/venta.entity.js";
import { Lote } from "../lote/entities/lote.entity.js";
import { PlanPago } from "../plan/entities/plan.entity.js";
import { User } from "../usuario/entities/user.entity.js";
import { Cuota } from "../cuota/entities/cuota.entity.js";
import { VentaController } from "./venta.controller.js";
import { VentaService } from "./venta.service.js";
let VentaModule = class VentaModule {
};
VentaModule = __decorate([
    Module({
        imports: [TypeOrmModule.forFeature([Venta, Lote, PlanPago, User, Cuota])],
        controllers: [VentaController],
        providers: [VentaService],
        exports: [VentaService],
    })
], VentaModule);
export { VentaModule };
//# sourceMappingURL=venta.module.js.map