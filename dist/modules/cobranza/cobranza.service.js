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
import { Injectable, NotFoundException, UnauthorizedException, } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Venta, VentaEstado } from "../venta/entities/venta.entity.js";
import { Cuota, CuotaEstado } from "../cuota/entities/cuota.entity.js";
import { Pago } from "../pago/entities/pago.entity.js";
import { User } from "../usuario/entities/user.entity.js";
let CobranzaService = class CobranzaService {
    ventas;
    cuotas;
    pagos;
    users;
    constructor(ventas, cuotas, pagos, users) {
        this.ventas = ventas;
        this.cuotas = cuotas;
        this.pagos = pagos;
        this.users = users;
    }
    async deudores() {
        const ventas = await this.ventas.find({
            where: { estado: VentaEstado.ACTIVA },
            relations: ["comprador", "lote", "planPago"],
        });
        const out = [];
        const now = new Date();
        for (const v of ventas) {
            const cuotas = await this.cuotas.find({
                where: { ventaId: v.id },
                order: { numero: "ASC" },
            });
            const venc = cuotas.filter((c) => Number(c.saldo) > 0 &&
                new Date(`${c.fechaVencimiento}T23:59:59`) < now);
            const adeudado = cuotas.reduce((a, c) => a + Number(c.saldo), 0);
            if (venc.length || adeudado > 0)
                out.push({
                    ventaId: v.id,
                    compradorId: v.compradorId,
                    comprador: `${v.comprador.nombre} ${v.comprador.apellido}`,
                    dni: v.comprador.dni,
                    lote: v.lote.codigo,
                    plan: v.planPago?.nombre ?? v.formatoPago,
                    cuotasPagadas: cuotas.filter((c) => c.estado === CuotaEstado.PAGADA)
                        .length,
                    cuotasPendientes: cuotas.filter((c) => Number(c.saldo) > 0).length,
                    cuotasVencidas: venc.length,
                    totalVencido: venc.reduce((a, c) => a + Number(c.saldo), 0),
                    totalAdeudado: adeudado,
                    ultimoVencimiento: venc[0]?.fechaVencimiento ?? null,
                    estado: venc.length ? "Moroso" : "Pendiente",
                });
        }
        return {
            statusCode: 200,
            message: "Deudores obtenidos correctamente",
            data: out,
        };
    }
    async cuentaComprador(id, user) {
        if (user?.role === "CLIENTE" && user.id !== id)
            throw new UnauthorizedException("No podés consultar otra cuenta");
        const comprador = await this.users.findOneBy({ id });
        if (!comprador)
            throw new NotFoundException("Comprador no encontrado");
        const ventas = await this.ventas.find({
            where: { compradorId: id, estado: VentaEstado.ACTIVA },
            relations: ["lote", "lote.manzana", "lote.manzana.loteo", "planPago"],
        });
        const data = await Promise.all(ventas.map(async (v) => ({
            venta: v,
            cuotas: await this.cuotas.find({
                where: { ventaId: v.id },
                order: { numero: "ASC" },
            }),
            pagos: await this.pagos.find({
                where: { ventaId: v.id },
                order: { fechaPago: "ASC", id: "ASC" },
            }),
        })));
        return {
            statusCode: 200,
            message: "Cuenta corriente obtenida correctamente",
            data: { comprador, ventas: data },
        };
    }
};
CobranzaService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Venta)),
    __param(1, InjectRepository(Cuota)),
    __param(2, InjectRepository(Pago)),
    __param(3, InjectRepository(User)),
    __metadata("design:paramtypes", [Repository,
        Repository,
        Repository,
        Repository])
], CobranzaService);
export { CobranzaService };
//# sourceMappingURL=cobranza.service.js.map