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
import { CotizacionService } from "./cotizacion.service.js";
import { AuthGuard } from "../../common/guards/auth.guard.js";
let CotizacionController = class CotizacionController {
    service;
    constructor(service) {
        this.service = service;
    }
    dolar() {
        return this.service.dolar();
    }
};
__decorate([
    Get("dolar"),
    ApiOperation({ summary: "Obtener cotización del dólar" }),
    ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CotizacionController.prototype, "dolar", null);
CotizacionController = __decorate([
    ApiTags("Cotización"),
    ApiBearerAuth(),
    UseGuards(AuthGuard),
    Controller("cotizacion"),
    __metadata("design:paramtypes", [CotizacionService])
], CotizacionController);
export { CotizacionController };
//# sourceMappingURL=cotizacion.controller.js.map