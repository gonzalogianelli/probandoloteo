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
import { VentaService } from "./venta.service.js";
import { CreateVentaDto } from "./dto/create-venta.dto.js";
import { UpdateVentaDto } from "./dto/update-venta.dto.js";
import { PaginationDto } from "../../common/dto/pagination.dto.js";
import { AuthGuard } from "../../common/guards/auth.guard.js";
import { RolesGuard } from "../../common/guards/roles.guard.js";
import { Roles } from "../../common/decorators/roles.decorator.js";
let VentaController = class VentaController {
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
    Roles("ADMIN", "VENTA", "COBRANZA", "CLIENTE"),
    ApiOperation({ summary: "Listar ventas" }),
    __param(0, Query()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PaginationDto, Object]),
    __metadata("design:returntype", void 0)
], VentaController.prototype, "findAll", null);
__decorate([
    Get(":id"),
    Roles("ADMIN", "VENTA", "COBRANZA", "CLIENTE"),
    ApiOperation({ summary: "Obtener venta por ID" }),
    ApiParam({ name: "id", type: Number }),
    __param(0, Param("id", ParseIntPipe)),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], VentaController.prototype, "getById", null);
__decorate([
    Post(),
    Roles("ADMIN", "VENTA"),
    ApiOperation({ summary: "Registrar una venta y generar sus cuotas" }),
    ApiBody({ type: CreateVentaDto }),
    ApiResponse({ status: 201 }),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateVentaDto, Object]),
    __metadata("design:returntype", void 0)
], VentaController.prototype, "create", null);
__decorate([
    Patch(":id"),
    Roles("ADMIN", "VENTA"),
    ApiOperation({ summary: "Actualizar una venta" }),
    ApiBody({ type: UpdateVentaDto }),
    __param(0, Param("id", ParseIntPipe)),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateVentaDto, Object]),
    __metadata("design:returntype", void 0)
], VentaController.prototype, "update", null);
__decorate([
    Delete(":id"),
    Roles("ADMIN"),
    ApiOperation({ summary: "Eliminar una venta no activa" }),
    __param(0, Param("id", ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VentaController.prototype, "remove", null);
VentaController = __decorate([
    ApiTags("Ventas"),
    ApiBearerAuth(),
    UseGuards(AuthGuard, RolesGuard),
    Controller("ventas"),
    __metadata("design:paramtypes", [VentaService])
], VentaController);
export { VentaController };
//# sourceMappingURL=venta.controller.js.map