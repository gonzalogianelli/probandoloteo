var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PagoCuota } from "./entities/pago-cuota.entity.js";
import { PagoCuotaController } from "./pago-cuota.controller.js";
import { PagoCuotaService } from "./pago-cuota.service.js";
let PagoCuotaModule = class PagoCuotaModule {
};
PagoCuotaModule = __decorate([
    Module({
        imports: [TypeOrmModule.forFeature([PagoCuota])],
        controllers: [PagoCuotaController],
        providers: [PagoCuotaService],
        exports: [PagoCuotaService],
    })
], PagoCuotaModule);
export { PagoCuotaModule };
//# sourceMappingURL=pago-cuota.module.js.map