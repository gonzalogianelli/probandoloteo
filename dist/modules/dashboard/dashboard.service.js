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
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Venta, VentaEstado } from "../venta/entities/venta.entity.js";
import { Pago, Moneda } from "../pago/entities/pago.entity.js";
import { ReporteService } from "../reporte/reporte.service.js";
import { today } from "../../common/utils/helpers.js";
let DashboardService = class DashboardService {
    ventas;
    pagos;
    reporte;
    constructor(ventas, pagos, reporte) {
        this.ventas = ventas;
        this.pagos = pagos;
        this.reporte = reporte;
    }
    async dashboard() {
        const rep = await this.reporte.reporteVentas();
        const ventas = await this.ventas.find({
            where: { estado: VentaEstado.ACTIVA },
        });
        const pagos = await this.pagos.find({ where: { fechaPago: today() } });
        return {
            statusCode: 200,
            message: "Dashboard obtenido correctamente",
            data: {
                ...rep.data,
                recaudacionHoy: pagos
                    .filter((p) => p.moneda === Moneda.ARS)
                    .reduce((a, p) => a + Number(p.importeTotal), 0),
                ventasActivas: ventas.length,
                fecha: today(),
            },
        };
    }
};
DashboardService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Venta)),
    __param(1, InjectRepository(Pago)),
    __metadata("design:paramtypes", [Repository,
        Repository,
        ReporteService])
], DashboardService);
export { DashboardService };
//# sourceMappingURL=dashboard.service.js.map