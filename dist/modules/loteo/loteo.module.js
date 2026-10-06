var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Loteo } from "./entities/loteo.entity.js";
import { LoteoController } from "./loteo.controller.js";
import { LoteoService } from "./loteo.service.js";
let LoteoModule = class LoteoModule {
};
LoteoModule = __decorate([
    Module({
        imports: [TypeOrmModule.forFeature([Loteo])],
        controllers: [LoteoController],
        providers: [LoteoService],
        exports: [LoteoService],
    })
], LoteoModule);
export { LoteoModule };
//# sourceMappingURL=loteo.module.js.map