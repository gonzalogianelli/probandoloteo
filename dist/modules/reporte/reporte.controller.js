var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, } from "@nestjs/swagger";
import { ReporteService } from "./reporte.service.js";
import { AuthGuard } from "../../common/guards/auth.guard.js";
import { RolesGuard } from "../../common/guards/roles.guard.js";
import { Roles } from "../../common/decorators/roles.decorator.js";
let ReporteController = class ReporteController {
    service;
    constructor(service) {
        this.service = service;
    }
    ventas() {
        return this.service.reporteVentas();
    }
    deudores() {
        return this.service.deudores();
    }
};
__decorate([
    Get("ventas"),
    ApiOperation({ summary: "Reporte de estado de lotes" }),
    ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReporteController.prototype, "ventas", null);
__decorate([
    Get("deudores"),
    ApiOperation({ summary: "Reporte de deudores" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReporteController.prototype, "deudores", null);
ReporteController = __decorate([
    ApiTags("Reportes"),
    ApiBearerAuth(),
    UseGuards(AuthGuard, RolesGuard),
    Roles("ADMIN"),
    Controller("reportes"),
    __metadata("design:paramtypes", [ReporteService])
], ReporteController);
export { ReporteController };
//# sourceMappingURL=reporte.controller.js.map