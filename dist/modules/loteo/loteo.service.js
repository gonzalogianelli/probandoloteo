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
import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { resolveOrder, ensureUpdateData } from "../../common/utils/crud.js";
import { Loteo } from "./entities/loteo.entity.js";
let LoteoService = class LoteoService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async findAll(skip = 0, limit = 10, orderby) {
        const order = resolveOrder(this.repository, orderby);
        const data = await this.repository.find({
            skip,
            take: limit,
            ...(order ? { order } : {}),
        });
        return {
            statusCode: HttpStatus.OK,
            message: "loteos obtenidos correctamente",
            data,
        };
    }
    async getById(id) {
        const data = await this.repository.findOne({ where: { id } });
        if (!data)
            throw new NotFoundException("Loteo no encontrado");
        return {
            statusCode: HttpStatus.OK,
            message: "Loteo obtenido correctamente",
            data,
        };
    }
    async create(dto) {
        try {
            const data = this.repository.create(dto);
            const saved = await this.repository.save(data);
            return {
                statusCode: HttpStatus.CREATED,
                message: "Loteo creado correctamente",
                data: saved,
            };
        }
        catch (error) {
            if (error?.code === "ER_DUP_ENTRY")
                throw new BadRequestException("Ya existe un registro con alguno de los valores únicos enviados");
            throw new InternalServerErrorException("Error interno al crear Loteo");
        }
    }
    async update(id, dto) {
        ensureUpdateData(dto);
        const current = await this.repository.findOne({ where: { id } });
        if (!current)
            throw new NotFoundException("Loteo no encontrado");
        try {
            const merged = this.repository.merge(current, dto);
            const saved = await this.repository.save(merged);
            return {
                statusCode: HttpStatus.OK,
                message: "Loteo actualizado correctamente",
                data: saved,
            };
        }
        catch (error) {
            if (error?.code === "ER_DUP_ENTRY")
                throw new BadRequestException("Ya existe un registro con alguno de los valores únicos enviados");
            throw new InternalServerErrorException("Error interno al actualizar Loteo");
        }
    }
    async remove(id) {
        const current = await this.repository.findOne({ where: { id } });
        if (!current)
            throw new NotFoundException("Loteo no encontrado");
        try {
            await this.repository.softRemove(current);
            return {
                statusCode: HttpStatus.OK,
                message: "Loteo eliminado correctamente",
            };
        }
        catch {
            throw new InternalServerErrorException("No se puede eliminar Loteo porque tiene registros relacionados o ocurrió un error interno");
        }
    }
};
LoteoService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Loteo)),
    __metadata("design:paramtypes", [Repository])
], LoteoService);
export { LoteoService };
//# sourceMappingURL=loteo.service.js.map