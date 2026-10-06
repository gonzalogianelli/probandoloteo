var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MedioPago } from "./entities/medio.entity.js";
import { MedioController } from "./medio.controller.js";
import { MedioService } from "./medio.service.js";
let MedioModule = class MedioModule {
};
MedioModule = __decorate([
    Module({
        imports: [TypeOrmModule.forFeature([MedioPago])],
        controllers: [MedioController],
        providers: [MedioService],
        exports: [MedioService],
    })
], MedioModule);
export { MedioModule };
//# sourceMappingURL=medio.module.js.map