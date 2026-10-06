var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Venta } from "../venta/entities/venta.entity.js";
import { Cuota } from "../cuota/entities/cuota.entity.js";
import { Pago } from "../pago/entities/pago.entity.js";
import { User } from "../usuario/entities/user.entity.js";
import { CobranzaController } from "./cobranza.controller.js";
import { CobranzaService } from "./cobranza.service.js";
let CobranzaModule = class CobranzaModule {
};
CobranzaModule = __decorate([
    Module({
        imports: [TypeOrmModule.forFeature([Venta, Cuota, Pago, User])],
        controllers: [CobranzaController],
        providers: [CobranzaService],
        exports: [CobranzaService],
    })
], CobranzaModule);
export { CobranzaModule };
//# sourceMappingURL=cobranza.module.js.map