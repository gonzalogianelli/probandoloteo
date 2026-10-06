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
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags, } from "@nestjs/swagger";
import { AuthGuard } from "../../common/guards/auth.guard.js";
import { RolesGuard } from "../../common/guards/roles.guard.js";
import { Roles } from "../../common/decorators/roles.decorator.js";
import { PaginationDto } from "../../common/dto/pagination.dto.js";
import { CreateLoteServicioDto } from "./dto/create-lote-servicio.dto.js";
import { UpdateLoteServicioDto } from "./dto/update-lote-servicio.dto.js";
import { LoteServicioService } from "./lote-servicio.service.js";
let LoteServicioController = class LoteServicioController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll(query) {
        return this.service.findAll(query.skip, query.limit, query.orderby);
    }
    getById(loteId, servicioId) {
        return this.service.getById(loteId, servicioId);
    }
    create(dto) {
        return this.service.create(dto);
    }
    update(loteId, servicioId, dto) {
        return this.service.update(loteId, servicioId, dto);
    }
    remove(loteId, servicioId) {
        return this.service.remove(loteId, servicioId);
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: "Obtener relaciones entre lotes y servicios" }),
    ApiResponse({
        status: 200,
        description: "Relaciones obtenidas correctamente",
    }),
    ApiResponse({ status: 500, description: "Error interno del servidor" }),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PaginationDto]),
    __metadata("design:returntype", void 0)
], LoteServicioController.prototype, "findAll", null);
__decorate([
    Get(":loteId/:servicioId"),
    ApiOperation({ summary: "Obtener una relación lote-servicio" }),
    ApiParam({ name: "loteId", type: Number }),
    ApiParam({ name: "servicioId", type: Number }),
    ApiResponse({ status: 200, description: "Relación obtenida correctamente" }),
    ApiResponse({ status: 404, description: "Relación no encontrada" }),
    __param(0, Param("loteId", ParseIntPipe)),
    __param(1, Param("servicioId", ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], LoteServicioController.prototype, "getById", null);
__decorate([
    Post(),
    ApiOperation({ summary: "Asociar un servicio a un lote" }),
    ApiBody({ type: CreateLoteServicioDto }),
    ApiResponse({ status: 201, description: "Relación creada correctamente" }),
    ApiResponse({
        status: 400,
        description: "Lote/servicio inexistente o relación duplicada",
    }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateLoteServicioDto]),
    __metadata("design:returntype", void 0)
], LoteServicioController.prototype, "create", null);
__decorate([
    Patch(":loteId/:servicioId"),
    ApiOperation({ summary: "Actualizar una relación lote-servicio" }),
    ApiParam({ name: "loteId", type: Number }),
    ApiParam({ name: "servicioId", type: Number }),
    ApiBody({ type: UpdateLoteServicioDto }),
    ApiResponse({
        status: 200,
        description: "Relación actualizada correctamente",
    }),
    ApiResponse({
        status: 400,
        description: "Datos inválidos o relación duplicada",
    }),
    ApiResponse({ status: 404, description: "Relación no encontrada" }),
    __param(0, Param("loteId", ParseIntPipe)),
    __param(1, Param("servicioId", ParseIntPipe)),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, UpdateLoteServicioDto]),
    __metadata("design:returntype", void 0)
], LoteServicioController.prototype, "update", null);
__decorate([
    Delete(":loteId/:servicioId"),
    ApiOperation({ summary: "Eliminar una relación lote-servicio" }),
    ApiParam({ name: "loteId", type: Number }),
    ApiParam({ name: "servicioId", type: Number }),
    ApiResponse({ status: 200, description: "Relación eliminada correctamente" }),
    ApiResponse({ status: 404, description: "Relación no encontrada" }),
    ApiResponse({ status: 500, description: "Error interno al eliminar" }),
    __param(0, Param("loteId", ParseIntPipe)),
    __param(1, Param("servicioId", ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], LoteServicioController.prototype, "remove", null);
LoteServicioController = __decorate([
    ApiTags("Lote - Servicios"),
    ApiBearerAuth(),
    UseGuards(AuthGuard, RolesGuard),
    Roles("ADMIN"),
    Controller("lote-servicios"),
    __metadata("design:paramtypes", [LoteServicioService])
], LoteServicioController);
export { LoteServicioController };
//# sourceMappingURL=lote-servicio.controller.js.map