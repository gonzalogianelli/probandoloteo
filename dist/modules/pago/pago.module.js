var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pago } from "./entities/pago.entity.js";
import { PagoCuota } from "../pago-cuota/entities/pago-cuota.entity.js";
import { PagoMedio } from "../pago-medio/entities/pago-medio.entity.js";
import { Venta } from "../venta/entities/venta.entity.js";
import { Cuota } from "../cuota/entities/cuota.entity.js";
import { MedioPago } from "../medio/entities/medio.entity.js";
import { PagoController } from "./pago.controller.js";
import { PagoService } from "./pago.service.js";
let PagoModule = class PagoModule {
};
PagoModule = __decorate([
    Module({
        imports: [
            TypeOrmModule.forFeature([
                Pago,
                PagoCuota,
                PagoMedio,
                Venta,
                Cuota,
                MedioPago,
            ]),
        ],
        controllers: [PagoController],
        providers: [PagoService],
        exports: [PagoService],
    })
], PagoModule);
export { PagoModule };
//# sourceMappingURL=pago.module.js.map