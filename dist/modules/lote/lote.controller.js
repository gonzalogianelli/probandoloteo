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
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards, } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags, } from "@nestjs/swagger";
import { LoteService } from "./lote.service.js";
import { CreateLoteDto } from "./dto/create-lote.dto.js";
import { UpdateLoteDto } from "./dto/update-lote.dto.js";
import { LoteEstado } from "./entities/lote.entity.js";
import { AuthGuard } from "../../common/guards/auth.guard.js";
import { RolesGuard } from "../../common/guards/roles.guard.js";
import { Roles } from "../../common/decorators/roles.decorator.js";
let LoteController = class LoteController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll(q) {
        return this.service.findAll(q);
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
    Roles("ADMIN", "VENTAS"),
    ApiOperation({ summary: "Listar lotes con filtros" }),
    ApiQuery({ name: "manzanaId", required: false, type: Number }),
    ApiQuery({ name: "loteoId", required: false, type: Number }),
    ApiQuery({ name: "estado", required: false, enum: LoteEstado }),
    ApiResponse({ status: 200 }),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LoteController.prototype, "findAll", null);
__decorate([
    Get(":id"),
    Roles("ADMIN", "VENTAS"),
    ApiOperation({ summary: "Obtener lote por ID" }),
    ApiParam({ name: "id", type: Number }),
    __param(0, Param("id", ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LoteController.prototype, "getById", null);
__decorate([
    Post(),
    HttpCode(HttpStatus.CREATED),
    Roles("ADMIN"),
    ApiOperation({ summary: "Crear lote" }),
    ApiBody({ type: CreateLoteDto }),
    ApiResponse({ status: 201, description: "Lote creado correctamente" }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateLoteDto]),
    __metadata("design:returntype", void 0)
], LoteController.prototype, "create", null);
__decorate([
    Patch(":id"),
    Roles("ADMIN"),
    ApiOperation({ summary: "Actualizar lote" }),
    ApiBody({ type: UpdateLoteDto }),
    __param(0, Param("id", ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateLoteDto]),
    __metadata("design:returntype", void 0)
], LoteController.prototype, "update", null);
__decorate([
    Delete(":id"),
    Roles("ADMIN"),
    ApiOperation({ summary: "Eliminar lote" }),
    __param(0, Param("id", ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LoteController.prototype, "remove", null);
LoteController = __decorate([
    ApiTags("Lotes"),
    ApiBearerAuth(),
    UseGuards(AuthGuard, RolesGuard),
    Controller("lotes"),
    __metadata("design:paramtypes", [LoteService])
], LoteController);
export { LoteController };
//# sourceMappingURL=lote.controller.js.map