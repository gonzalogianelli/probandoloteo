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
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards, } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags, } from "@nestjs/swagger";
import { PagoService } from "./pago.service.js";
import { CreatePagoDto } from "./dto/create-pago.dto.js";
import { UpdatePagoDto } from "./dto/update-pago.dto.js";
import { PaginationDto } from "../../common/dto/pagination.dto.js";
import { AuthGuard } from "../../common/guards/auth.guard.js";
import { RolesGuard } from "../../common/guards/roles.guard.js";
import { Roles } from "../../common/decorators/roles.decorator.js";
let PagoController = class PagoController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll(q, req) {
        return this.service.findAll(q, req.user);
    }
    getById(id, req) {
        return this.service.getById(id, req.user);
    }
    create(dto, req) {
        return this.service.create(dto, req.user);
    }
    update(id, dto, req) {
        return this.service.update(id, dto, req.user);
    }
    remove(id) {
        return this.service.remove(id);
    }
};
__decorate([
    Get(),
    Roles("ADMIN", "COBRANZA", "VENTA", "CLIENTE"),
    ApiOperation({ summary: "Listar pagos" }),
    __param(0, Query()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PaginationDto, Object]),
    __metadata("design:returntype", void 0)
], PagoController.prototype, "findAll", null);
__decorate([
    Get(":id"),
    Roles("ADMIN", "COBRANZA", "VENTA", "CLIENTE"),
    ApiOperation({ summary: "Obtener pago por ID" }),
    ApiParam({ name: "id", type: Number }),
    __param(0, Param("id", ParseIntPipe)),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PagoController.prototype, "getById", null);
__decorate([
    Post(),
    Roles("ADMIN", "COBRANZA"),
    ApiOperation({ summary: "Registrar pago y aplicar saldo a cuotas" }),
    ApiBody({ type: CreatePagoDto }),
    ApiResponse({ status: 201 }),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePagoDto, Object]),
    __metadata("design:returntype", void 0)
], PagoController.prototype, "create", null);
__decorate([
    Patch(":id"),
    Roles("ADMIN", "COBRANZA"),
    ApiOperation({ summary: "Actualizar pago" }),
    ApiBody({ type: UpdatePagoDto }),
    __param(0, Param("id", ParseIntPipe)),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdatePagoDto, Object]),
    __metadata("design:returntype", void 0)
], PagoController.prototype, "update", null);
__decorate([
    Delete(":id"),
    Roles("ADMIN", "COBRANZA"),
    ApiOperation({ summary: "Eliminar pago" }),
    __param(0, Param("id", ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PagoController.prototype, "remove", null);
PagoController = __decorate([
    ApiTags("Pagos"),
    ApiBearerAuth(),
    UseGuards(AuthGuard, RolesGuard),
    Controller("pagos"),
    __metadata("design:paramtypes", [PagoService])
], PagoController);
export { PagoController };
//# sourceMappingURL=pago.controller.js.map