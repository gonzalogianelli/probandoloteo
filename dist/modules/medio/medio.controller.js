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
import { MedioService } from "./medio.service.js";
import { CreateMedioDto } from "./dto/create-medio.dto.js";
import { UpdateMedioDto } from "./dto/update-medio.dto.js";
let MedioController = class MedioController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll(query) {
        return this.service.findAll(query.skip, query.limit, query.orderby);
    }
    getById(id) {
        return this.service.getById(id);
    }
    create(dto) {
        return this.service.create(dto);
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    remove(id) {
        return this.service.remove(id);
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: "Obtener todos los registros" }),
    ApiResponse({
        status: 200,
        description: "Registros obtenidos correctamente",
    }),
    ApiResponse({ status: 500, description: "Error interno del servidor" }),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PaginationDto]),
    __metadata("design:returntype", void 0)
], MedioController.prototype, "findAll", null);
__decorate([
    Get(":id"),
    ApiOperation({ summary: "Obtener un registro por ID" }),
    ApiParam({ name: "id", type: Number }),
    ApiResponse({ status: 200, description: "Registro obtenido correctamente" }),
    ApiResponse({ status: 404, description: "Registro no encontrado" }),
    __param(0, Param("id", ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MedioController.prototype, "getById", null);
__decorate([
    Post(),
    ApiOperation({ summary: "Crear un registro" }),
    ApiBody({ type: CreateMedioDto }),
    ApiResponse({ status: 201, description: "Registro creado correctamente" }),
    ApiResponse({ status: 400, description: "Datos inválidos o duplicados" }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateMedioDto]),
    __metadata("design:returntype", void 0)
], MedioController.prototype, "create", null);
__decorate([
    Patch(":id"),
    ApiOperation({ summary: "Actualizar un registro" }),
    ApiParam({ name: "id", type: Number }),
    ApiBody({ type: UpdateMedioDto }),
    ApiResponse({
        status: 200,
        description: "Registro actualizado correctamente",
    }),
    ApiResponse({ status: 400, description: "Datos inválidos" }),
    ApiResponse({ status: 404, description: "Registro no encontrado" }),
    __param(0, Param("id", ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateMedioDto]),
    __metadata("design:returntype", void 0)
], MedioController.prototype, "update", null);
__decorate([
    Delete(":id"),
    ApiOperation({ summary: "Eliminar un registro" }),
    ApiParam({ name: "id", type: Number }),
    ApiResponse({ status: 200, description: "Registro eliminado correctamente" }),
    ApiResponse({ status: 404, description: "Registro no encontrado" }),
    ApiResponse({
        status: 500,
        description: "No se puede eliminar por dependencias",
    }),
    __param(0, Param("id", ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MedioController.prototype, "remove", null);
MedioController = __decorate([
    ApiTags("Medios de pago"),
    ApiBearerAuth(),
    UseGuards(AuthGuard, RolesGuard),
    Roles("ADMIN"),
    Controller("medios-pago"),
    __metadata("design:paramtypes", [MedioService])
], MedioController);
export { MedioController };
//# sourceMappingURL=medio.controller.js.map