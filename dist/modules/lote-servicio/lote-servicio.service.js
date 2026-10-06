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
import { ensureUpdateData, resolveOrder } from "../../common/utils/crud.js";
import { LoteServicio } from "./entities/lote-servicio.entity.js";
import { Lote } from "../lote/entities/lote.entity.js";
import { Servicio } from "../servicio/entities/servicio.entity.js";
let LoteServicioService = class LoteServicioService {
    repository;
    lotes;
    servicios;
    constructor(repository, lotes, servicios) {
        this.repository = repository;
        this.lotes = lotes;
        this.servicios = servicios;
    }
    async findAll(skip = 0, limit = 10, orderby) {
        const order = resolveOrder(this.repository, orderby);
        const data = await this.repository.find({
            skip,
            take: limit,
            relations: ["lote", "servicio"],
            ...(order ? { order } : {}),
        });
        return {
            statusCode: HttpStatus.OK,
            message: "Relaciones lote-servicio obtenidas correctamente",
            data,
        };
    }
    async getById(loteId, servicioId) {
        const data = await this.repository.findOne({
            where: { loteId, servicioId },
            relations: ["lote", "servicio"],
        });
        if (!data)
            throw new NotFoundException("Relación lote-servicio no encontrada");
        return {
            statusCode: HttpStatus.OK,
            message: "Relación lote-servicio obtenida correctamente",
            data,
        };
    }
    async create(dto) {
        if (!(await this.lotes.existsBy({ id: dto.loteId })))
            throw new BadRequestException("El lote indicado no existe");
        if (!(await this.servicios.existsBy({ id: dto.servicioId })))
            throw new BadRequestException("El servicio indicado no existe");
        const exists = await this.repository.findOneBy({
            loteId: dto.loteId,
            servicioId: dto.servicioId,
        });
        if (exists)
            throw new BadRequestException("El servicio ya está asociado al lote");
        try {
            const entity = this.repository.create({
                loteId: dto.loteId,
                servicioId: dto.servicioId,
            });
            await this.repository.save(entity);
            return this.getById(dto.loteId, dto.servicioId);
        }
        catch (error) {
            if (error?.code === "ER_DUP_ENTRY")
                throw new BadRequestException("El servicio ya está asociado al lote");
            throw new InternalServerErrorException("Error interno al crear la relación lote-servicio");
        }
    }
    async update(loteId, servicioId, dto) {
        ensureUpdateData(dto);
        const current = await this.repository.findOneBy({ loteId, servicioId });
        if (!current)
            throw new NotFoundException("Relación lote-servicio no encontrada");
        const newLoteId = dto.loteId ?? loteId;
        const newServicioId = dto.servicioId ?? servicioId;
        if (!(await this.lotes.existsBy({ id: newLoteId })))
            throw new BadRequestException("El lote indicado no existe");
        if (!(await this.servicios.existsBy({ id: newServicioId })))
            throw new BadRequestException("El servicio indicado no existe");
        if (newLoteId !== loteId || newServicioId !== servicioId) {
            const duplicate = await this.repository.findOneBy({
                loteId: newLoteId,
                servicioId: newServicioId,
            });
            if (duplicate)
                throw new BadRequestException("El servicio ya está asociado al lote");
        }
        try {
            await this.repository.manager.transaction(async (manager) => {
                await manager
                    .getRepository(LoteServicio)
                    .delete({ loteId, servicioId });
                await manager.getRepository(LoteServicio).save(manager.getRepository(LoteServicio).create({
                    loteId: newLoteId,
                    servicioId: newServicioId,
                }));
            });
            return this.getById(newLoteId, newServicioId);
        }
        catch (error) {
            if (error?.code === "ER_DUP_ENTRY")
                throw new BadRequestException("El servicio ya está asociado al lote");
            throw new InternalServerErrorException("Error interno al actualizar la relación lote-servicio");
        }
    }
    async remove(loteId, servicioId) {
        const current = await this.repository.findOneBy({ loteId, servicioId });
        if (!current)
            throw new NotFoundException("Relación lote-servicio no encontrada");
        try {
            await this.repository.softRemove({ loteId, servicioId });
            return {
                statusCode: HttpStatus.OK,
                message: "Relación lote-servicio eliminada correctamente",
            };
        }
        catch {
            throw new InternalServerErrorException("Error interno al eliminar la relación lote-servicio");
        }
    }
};
LoteServicioService = __decorate([
    Injectable(),
    __param(0, InjectRepository(LoteServicio)),
    __param(1, InjectRepository(Lote)),
    __param(2, InjectRepository(Servicio)),
    __metadata("design:paramtypes", [Repository,
        Repository,
        Repository])
], LoteServicioService);
export { LoteServicioService };
//# sourceMappingURL=lote-servicio.service.js.map