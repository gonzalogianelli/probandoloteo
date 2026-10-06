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
import { Lote, LoteEstado } from "../lote/entities/lote.entity.js";
import { CobranzaService } from "../cobranza/cobranza.service.js";
let ReporteService = class ReporteService {
    lotes;
    cobranza;
    constructor(lotes, cobranza) {
        this.lotes = lotes;
        this.cobranza = cobranza;
    }
    async reporteVentas() {
        const lots = await this.lotes.find({
            relations: ["manzana", "manzana.loteo"],
        });
        const data = {
            totales: {
                libres: lots.filter((x) => x.estado === LoteEstado.LIBRE).length,
                reservados: lots.filter((x) => x.estado === LoteEstado.RESERVADO)
                    .length,
                vendidos: lots.filter((x) => x.estado === LoteEstado.VENDIDO).length,
                total: lots.length,
            },
            porManzana: Object.values(lots.reduce((a, l) => {
                const k = l.manzana?.nombre ?? "?";
                a[k] ??= { manzana: k, libres: 0, reservados: 0, vendidos: 0 };
                a[k][l.estado === LoteEstado.LIBRE
                    ? "libres"
                    : l.estado === LoteEstado.RESERVADO
                        ? "reservados"
                        : "vendidos"]++;
                return a;
            }, {})),
        };
        return {
            statusCode: 200,
            message: "Reporte de ventas obtenido correctamente",
            data,
        };
    }
    async deudores() {
        return this.cobranza.deudores();
    }
};
ReporteService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Lote)),
    __metadata("design:paramtypes", [Repository,
        CobranzaService])
], ReporteService);
export { ReporteService };
//# sourceMappingURL=reporte.service.js.map