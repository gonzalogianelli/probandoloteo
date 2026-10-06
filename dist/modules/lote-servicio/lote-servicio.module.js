var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoteServicio } from "./entities/lote-servicio.entity.js";
import { LoteServicioController } from "./lote-servicio.controller.js";
import { LoteServicioService } from "./lote-servicio.service.js";
import { Lote } from "../lote/entities/lote.entity.js";
import { Servicio } from "../servicio/entities/servicio.entity.js";
let LoteServicioModule = class LoteServicioModule {
};
LoteServicioModule = __decorate([
    Module({
        imports: [TypeOrmModule.forFeature([LoteServicio, Lote, Servicio])],
        controllers: [LoteServicioController],
        providers: [LoteServicioService],
        exports: [LoteServicioService],
    })
], LoteServicioModule);
export { LoteServicioModule };
//# sourceMappingURL=lote-servicio.module.js.map