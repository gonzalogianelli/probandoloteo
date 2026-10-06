var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Lote } from "./entities/lote.entity.js";
import { LoteServicio } from "../lote-servicio/entities/lote-servicio.entity.js";
import { Manzana } from "../manzana/entities/manzana.entity.js";
import { Servicio } from "../servicio/entities/servicio.entity.js";
import { Venta } from "../venta/entities/venta.entity.js";
import { LoteController } from "./lote.controller.js";
import { LoteService } from "./lote.service.js";
let LoteModule = class LoteModule {
};
LoteModule = __decorate([
    Module({
        imports: [
            TypeOrmModule.forFeature([Lote, LoteServicio, Manzana, Servicio, Venta]),
        ],
        controllers: [LoteController],
        providers: [LoteService],
        exports: [LoteService],
    })
], LoteModule);
export { LoteModule };
//# sourceMappingURL=lote.module.js.map