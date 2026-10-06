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
import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException, } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Pago, Moneda } from "./entities/pago.entity.js";
import { PagoCuota } from "../pago-cuota/entities/pago-cuota.entity.js";
import { PagoMedio } from "../pago-medio/entities/pago-medio.entity.js";
import { Venta } from "../venta/entities/venta.entity.js";
import { Cuota, CuotaEstado } from "../cuota/entities/cuota.entity.js";
import { MedioPago } from "../medio/entities/medio.entity.js";
import { money } from "../../common/utils/helpers.js";
import { ensureUpdateData } from "../../common/utils/crud.js";
let PagoService = class PagoService {
    pagos;
    pagoCuotas;
    pagoMedios;
    ventas;
    cuotas;
    medios;
    ds;
    constructor(pagos, pagoCuotas, pagoMedios, ventas, cuotas, medios, ds) {
        this.pagos = pagos;
        this.pagoCuotas = pagoCuotas;
        this.pagoMedios = pagoMedios;
        this.ventas = ventas;
        this.cuotas = cuotas;
        this.medios = medios;
        this.ds = ds;
    }
    async findAll(q, user) {
        const qb = this.pagos
            .createQueryBuilder("p")
            .leftJoinAndSelect("p.venta", "v")
            .leftJoinAndSelect("v.comprador", "comprador")
            .leftJoinAndSelect("v.vendedor", "vendedor")
            .orderBy("p.fecha_pago", "DESC")
            .addOrderBy("p.id", "DESC")
            .skip(q.skip)
            .take(q.limit);
        if (user?.role === "CLIENTE")
            qb.andWhere("v.comprador_id = :compradorId", { compradorId: user.id });
        const data = await qb.getMany();
        return {
            statusCode: HttpStatus.OK,
            message: "Pagos obtenidos correctamente",
            data,
        };
    }
    async getById(id, user) {
        const p = await this.pagos.findOne({
            where: { id },
            relations: ["venta", "venta.comprador", "venta.vendedor"],
        });
        if (!p)
            throw new NotFoundException("Pago no encontrado");
        if (user?.role === "CLIENTE" && p.venta.compradorId !== user.id)
            throw new UnauthorizedException("No podés consultar otro pago");
        const [cuotas, medios] = await Promise.all([
            this.pagoCuotas.find({
                where: { pagoId: id },
                relations: ["cuota"],
                order: { id: "ASC" },
            }),
            this.pagoMedios.find({
                where: { pagoId: id },
                relations: ["medioPago"],
                order: { id: "ASC" },
            }),
        ]);
        return {
            statusCode: HttpStatus.OK,
            message: "Pago obtenido correctamente",
            data: { ...p, cuotas, medios },
        };
    }
    async create(dto, user) {
        const venta = await this.ventas.findOne({ where: { id: dto.ventaId } });
        if (!venta)
            throw new BadRequestException("La venta indicada no existe");
        if (user?.role === "CLIENTE" && venta.compradorId !== user.id)
            throw new UnauthorizedException("No podés registrar un pago para otra venta");
        const total = money(dto.importeTotal);
        if (total <= 0)
            throw new BadRequestException("El importe total debe ser mayor a cero");
        const moneda = dto.moneda ?? Moneda.ARS;
        return this.ds
            .transaction(async (m) => {
            const pago = await m.getRepository(Pago).save(m.getRepository(Pago).create({
                ventaId: venta.id,
                usuarioId: user?.id ?? null,
                fechaPago: dto.fechaPago,
                importeTotal: total,
                moneda,
                cotizacionDolar: dto.cotizacionDolar ?? null,
                observaciones: dto.observaciones ?? null,
                comprobanteUrl: dto.comprobanteUrl ?? null,
            }));
            const cuotaRepo = m.getRepository(Cuota);
            const selectedIds = dto.cuotaIds ?? [];
            const all = await cuotaRepo.find({
                where: { ventaId: venta.id },
                order: { numero: "ASC" },
            });
            const targets = selectedIds.length
                ? all.filter((c) => selectedIds.includes(c.id))
                : all;
            let restante = total;
            for (const c of targets) {
                if (restante <= 0)
                    break;
                if (Number(c.saldo) <= 0)
                    continue;
                const applied = money(Math.min(Number(c.saldo), restante));
                c.saldo = money(Number(c.saldo) - applied);
                c.estado = c.saldo <= 0 ? CuotaEstado.PAGADA : CuotaEstado.PARCIAL;
                if (c.estado !== CuotaEstado.PAGADA &&
                    new Date(`${c.fechaVencimiento}T23:59:59`) < new Date())
                    c.estado = CuotaEstado.VENCIDA;
                await cuotaRepo.save(c);
                await m.getRepository(PagoCuota).save(m.getRepository(PagoCuota).create({
                    pagoId: pago.id,
                    cuotaId: c.id,
                    importeAplicado: applied,
                }));
                restante = money(restante - applied);
            }
            if (selectedIds.length && restante > 0)
                throw new BadRequestException("El importe supera el saldo disponible de las cuotas seleccionadas");
            if (dto.mediosPago?.length) {
                const sum = dto.mediosPago.reduce((a, x) => a + money(x.importe), 0);
                if (Math.abs(sum - total) > 0.01)
                    throw new BadRequestException("La suma de los medios de pago debe coincidir con el importe total");
                for (const item of dto.mediosPago) {
                    const medio = await m
                        .getRepository(MedioPago)
                        .findOneBy({ id: item.medioPagoId });
                    if (!medio)
                        throw new BadRequestException(`El medio de pago ${item.medioPagoId} no existe`);
                    await m.getRepository(PagoMedio).save(m.getRepository(PagoMedio).create({
                        pagoId: pago.id,
                        medioPagoId: medio.id,
                        importe: money(item.importe),
                        referencia: item.referencia ?? null,
                    }));
                }
            }
            return pago.id;
        })
            .then((pagoId) => this.getById(pagoId, user));
    }
    async update(id, dto, user) {
        ensureUpdateData(dto);
        const p = await this.pagos.findOne({ where: { id }, relations: ["venta"] });
        if (!p)
            throw new NotFoundException("Pago no encontrado");
        if (user?.role === "CLIENTE" && p.venta.compradorId !== user.id)
            throw new UnauthorizedException("No podés modificar otro pago");
        const allowed = {};
        for (const k of [
            "fechaPago",
            "importeTotal",
            "moneda",
            "cotizacionDolar",
            "observaciones",
            "comprobanteUrl",
        ])
            if (dto[k] !== undefined)
                allowed[k] = dto[k];
        Object.assign(p, allowed);
        try {
            await this.pagos.save(p);
            return this.getById(id, user);
        }
        catch {
            throw new InternalServerErrorException("Error interno al actualizar el pago");
        }
    }
    async remove(id) {
        try {
            await this.ds.transaction(async (manager) => {
                const pagoRepo = manager.getRepository(Pago);
                const pago = await pagoRepo.findOneBy({ id });
                if (!pago)
                    throw new NotFoundException("Pago no encontrado");
                const allocationRepo = manager.getRepository(PagoCuota);
                const quotaRepo = manager.getRepository(Cuota);
                const allocations = await allocationRepo.find({
                    where: { pagoId: id },
                });
                const now = new Date();
                for (const allocation of allocations) {
                    const cuota = await quotaRepo.findOne({
                        where: { id: allocation.cuotaId },
                        lock: { mode: "pessimistic_write" },
                    });
                    if (!cuota)
                        throw new BadRequestException(`No se encontró la cuota ${allocation.cuotaId} para revertir el pago`);
                    cuota.saldo = money(Math.min(Number(cuota.importe), Number(cuota.saldo) + Number(allocation.importeAplicado)));
                    const vencida = new Date(`${cuota.fechaVencimiento}T23:59:59`) < now;
                    if (cuota.saldo >= Number(cuota.importe))
                        cuota.estado = vencida
                            ? CuotaEstado.VENCIDA
                            : CuotaEstado.PENDIENTE;
                    else
                        cuota.estado = vencida ? CuotaEstado.VENCIDA : CuotaEstado.PARCIAL;
                    await quotaRepo.save(cuota);
                }
                await pagoRepo.softDelete({ id });
            });
            return {
                statusCode: HttpStatus.OK,
                message: "Pago eliminado correctamente",
            };
        }
        catch (error) {
            if (error instanceof NotFoundException ||
                error instanceof BadRequestException)
                throw error;
            throw new InternalServerErrorException("No se puede eliminar el pago");
        }
    }
};
PagoService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Pago)),
    __param(1, InjectRepository(PagoCuota)),
    __param(2, InjectRepository(PagoMedio)),
    __param(3, InjectRepository(Venta)),
    __param(4, InjectRepository(Cuota)),
    __param(5, InjectRepository(MedioPago)),
    __metadata("design:paramtypes", [Repository,
        Repository,
        Repository,
        Repository,
        Repository,
        Repository,
        DataSource])
], PagoService);
export { PagoService };
//# sourceMappingURL=pago.service.js.map