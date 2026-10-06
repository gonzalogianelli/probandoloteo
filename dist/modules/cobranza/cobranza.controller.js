var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Get, Param, ParseIntPipe, Req, UseGuards, } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags, } from "@nestjs/swagger";
import { CobranzaService } from "./cobranza.service.js";
import { AuthGuard } from "../../common/guards/auth.guard.js";
import { RolesGuard } from "../../common/guards/roles.guard.js";
import { Roles } from "../../common/decorators/roles.decorator.js";
let CobranzaController = class CobranzaController {
    service;
    constructor(service) {
        this.service = service;
    }
    deudores() {
        return this.service.deudores();
    }
    cuenta(id, req) {
        return this.service.cuentaComprador(id, req.user);
    }
};
__decorate([
    Get("deudores"),
    Roles("ADMIN", "COBRANZA"),
    ApiOperation({ summary: "Obtener compradores con deuda" }),
    ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CobranzaController.prototype, "deudores", null);
__decorate([
    Get("comprador/:id"),
    Roles("ADMIN", "COBRANZA", "CLIENTE"),
    ApiOperation({ summary: "Obtener cuenta corriente de un comprador" }),
    ApiParam({ name: "id", type: Number }),
    __param(0, Param("id", ParseIntPipe)),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], CobranzaController.prototype, "cuenta", null);
CobranzaController = __decorate([
    ApiTags("Cobranzas"),
    ApiBearerAuth(),
    UseGuards(AuthGuard, RolesGuard),
    Controller("cobranzas"),
    __metadata("design:paramtypes", [CobranzaService])
], CobranzaController);
export { CobranzaController };
//# sourceMappingURL=cobranza.controller.js.map