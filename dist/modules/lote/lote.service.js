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
import { DataSource, In, Repository } from "typeorm";
import { Lote, LoteEstado } from "./entities/lote.entity.js";
import { Manzana } from "../manzana/entities/manzana.entity.js";
import { Servicio } from "../servicio/entities/servicio.entity.js";
import { Venta, VentaEstado } from "../venta/entities/venta.entity.js";
import { LoteServicio } from "../lote-servicio/entities/lote-servicio.entity.js";
import { money } from "../../common/utils/helpers.js";
import { ensureUpdateData } from "../../common/utils/crud.js";
let LoteService = class LoteService {
    lotes;
    manzanas;
    servicios;
    loteServicios;
    ventas;
    dataSource;
    constructor(lotes, manzanas, servicios, loteServicios, ventas, dataSource) {
        this.lotes = lotes;
        this.manzanas = manzanas;
        this.servicios = servicios;
        this.loteServicios = loteServicios;
        this.ventas = ventas;
        this.dataSource = dataSource;
    }
    async decorate(lot) {
        const sale = await this.ventas.findOne({
            where: { loteId: lot.id, estado: VentaEstado.ACTIVA },
            relations: ["comprador"],
        });
        const servicios = (lot.servicios ?? [])
            .map((item) => item.servicio)
            .filter(Boolean);
        return {
            ...lot,
            servicios,
            displayStatus: this.statusLabel(lot.estado),
            comprador: sale
                ? `${sale.comprador.nombre} ${sale.comprador.apellido}`
                : null,
            compradorDni: sale?.comprador.dni ?? null,
        };
    }
    async findAll(q) {
        const qb = this.lotes
            .createQueryBuilder("l")
            .leftJoinAndSelect("l.manzana", "m")
            .leftJoinAndSelect("m.loteo", "lo")
            .leftJoinAndSelect("l.servicios", "ls")
            .leftJoinAndSelect("ls.servicio", "s")
            .orderBy("lo.nombre", "ASC")
            .addOrderBy("m.nombre", "ASC")
            .addOrderBy("l.codigo", "ASC")
            .skip(q.skip)
            .take(q.limit);
        if (q.manzanaId)
            qb.andWhere("l.manzana_id = :manzanaId", { manzanaId: q.manzanaId });
        if (q.loteoId)
            qb.andWhere("m.loteo_id = :loteoId", { loteoId: q.loteoId });
        if (q.estado)
            qb.andWhere("l.estado = :estado", { estado: q.estado });
        const data = await qb.getMany();
        const result = await Promise.all(data.map((lot) => this.decorate(lot)));
        return {
            statusCode: HttpStatus.OK,
            message: "Lotes obtenidos correctamente",
            data: result,
        };
    }
    statusLabel(status) {
        return ({
            LIBRE: "Libre",
            RESERVADO: "Reservado",
            VENDIDO: "Vendido",
        }[status] ?? "Libre");
    }
    async getById(id) {
        const data = await this.lotes.findOne({
            where: { id },
            relations: [
                "manzana",
                "manzana.loteo",
                "servicios",
                "servicios.servicio",
            ],
        });
        if (!data)
            throw new NotFoundException("Lote no encontrado");
        return {
            statusCode: HttpStatus.OK,
            message: "Lote obtenido correctamente",
            data: await this.decorate(data),
        };
    }
    async create(dto) {
        const manzana = await this.manzanas.findOneBy({ id: dto.manzanaId });
        if (!manzana)
            throw new BadRequestException("La manzana indicada no existe");
        const rawServiciosIds = dto.serviciosIds ?? [];
        const servicioIds = [
            ...new Set(rawServiciosIds
                .map((id) => Number(id))
                .filter((id) => !isNaN(id) && id > 0)),
        ];
        let servicios = [];
        if (servicioIds.length > 0) {
            servicios = await this.servicios.findBy({ id: In(servicioIds) });
            if (servicios.length !== servicioIds.length) {
                const encontradosIds = servicios.map((s) => s.id);
                const faltantes = servicioIds.filter((id) => !encontradosIds.includes(id));
                throw new BadRequestException(`Los siguientes IDs de servicios no existen en la base de datos: [${faltantes.join(", ")}]. Recibidos: [${servicioIds.join(", ")}]`);
            }
        }
        try {
            const id = await this.dataSource.transaction(async (manager) => {
                const lote = manager.getRepository(Lote).create({
                    manzanaId: dto.manzanaId,
                    codigo: dto.codigo,
                    largo: money(dto.largo),
                    ancho: money(dto.ancho),
                    superficie: money(dto.largo) * money(dto.ancho),
                    precio: money(dto.precio),
                    estado: dto.estado ?? LoteEstado.LIBRE,
                    direccion: dto.direccion ?? null,
                    entreCalle1: dto.entreCalle1 ?? null,
                    entreCalle2: dto.entreCalle2 ?? null,
                });
                const saved = await manager.getRepository(Lote).save(lote);
                if (servicios.length > 0) {
                    const loteServiciosToSave = servicios.map((s) => manager.getRepository(LoteServicio).create({
                        loteId: saved.id,
                        servicioId: s.id,
                    }));
                    await manager.getRepository(LoteServicio).save(loteServiciosToSave);
                }
                return saved.id;
            });
            const createdLoteResponse = await this.getById(id);
            return {
                statusCode: HttpStatus.CREATED,
                message: "Lote creado correctamente",
                data: createdLoteResponse.data,
            };
        }
        catch (error) {
            if (error?.code === "ER_DUP_ENTRY")
                throw new BadRequestException("Ya existe un lote con ese código dentro de la manzana");
            if (error instanceof BadRequestException)
                throw error;
            throw new InternalServerErrorException("Error interno al crear el lote");
        }
    }
    async update(id, dto) {
        ensureUpdateData(dto);
        const lote = await this.lotes.findOne({
            where: { id },
            relations: ["servicios"],
        });
        if (!lote)
            throw new NotFoundException("Lote no encontrado");
        if (dto.manzanaId !== undefined) {
            if (!(await this.manzanas.existsBy({ id: dto.manzanaId })))
                throw new BadRequestException("La manzana indicada no existe");
            lote.manzanaId = dto.manzanaId;
        }
        if (dto.codigo !== undefined)
            lote.codigo = dto.codigo;
        if (dto.largo !== undefined)
            lote.largo = money(dto.largo);
        if (dto.ancho !== undefined)
            lote.ancho = money(dto.ancho);
        lote.superficie = money(lote.largo) * money(lote.ancho);
        if (dto.precio !== undefined)
            lote.precio = money(dto.precio);
        if (dto.estado !== undefined)
            lote.estado = dto.estado;
        if (dto.direccion !== undefined)
            lote.direccion = dto.direccion ?? null;
        if (dto.entreCalle1 !== undefined)
            lote.entreCalle1 = dto.entreCalle1 ?? null;
        if (dto.entreCalle2 !== undefined)
            lote.entreCalle2 = dto.entreCalle2 ?? null;
        let servicioIds = undefined;
        let servicios = [];
        if (dto.serviciosIds !== undefined) {
            const rawServiciosIds = dto.serviciosIds ?? [];
            servicioIds = [
                ...new Set(rawServiciosIds
                    .map((s) => Number(s))
                    .filter((s) => !isNaN(s) && s > 0)),
            ];
            if (servicioIds.length > 0) {
                servicios = await this.servicios.findBy({ id: In(servicioIds) });
                if (servicios.length !== servicioIds.length) {
                    const encontradosIds = servicios.map((s) => s.id);
                    const faltantes = servicioIds.filter((id) => !encontradosIds.includes(id));
                    throw new BadRequestException(`Los siguientes IDs de servicios no existen en la BD: [${faltantes.join(", ")}]. IDs recibidos del front: [${servicioIds.join(", ")}]`);
                }
            }
        }
        try {
            await this.dataSource.transaction(async (manager) => {
                await manager.getRepository(Lote).save(lote);
                if (servicioIds !== undefined) {
                    await manager.getRepository(LoteServicio).delete({ loteId: id });
                    if (servicios.length > 0) {
                        const loteServiciosToSave = servicios.map((servicio) => manager.getRepository(LoteServicio).create({
                            loteId: id,
                            servicioId: servicio.id,
                        }));
                        await manager.getRepository(LoteServicio).save(loteServiciosToSave);
                    }
                }
            });
            return this.getById(id);
        }
        catch (error) {
            if (error?.code === "ER_DUP_ENTRY")
                throw new BadRequestException("Ya existe un lote con ese código dentro de la manzana");
            if (error instanceof BadRequestException)
                throw error;
            throw new InternalServerErrorException("Error interno al actualizar el lote");
        }
    }
    async remove(id) {
        const lote = await this.lotes.findOneBy({ id });
        if (!lote)
            throw new NotFoundException("Lote no encontrado");
        const sale = await this.ventas.findOneBy({
            loteId: id,
            estado: VentaEstado.ACTIVA,
        });
        if (sale)
            throw new BadRequestException("No se puede eliminar un lote con una venta activa");
        try {
            await this.lotes.softRemove(lote);
            return {
                statusCode: HttpStatus.OK,
                message: "Lote eliminado correctamente",
            };
        }
        catch {
            throw new InternalServerErrorException("No se puede eliminar el lote porque tiene registros relacionados");
        }
    }
};
LoteService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Lote)),
    __param(1, InjectRepository(Manzana)),
    __param(2, InjectRepository(Servicio)),
    __param(3, InjectRepository(LoteServicio)),
    __param(4, InjectRepository(Venta)),
    __metadata("design:paramtypes", [Repository,
        Repository,
        Repository,
        Repository,
        Repository,
        DataSource])
], LoteService);
export { LoteService };
//# sourceMappingURL=lote.service.js.map