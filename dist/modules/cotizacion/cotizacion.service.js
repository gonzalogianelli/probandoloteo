var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, InternalServerErrorException } from "@nestjs/common";
let CotizacionService = class CotizacionService {
    async dolar() {
        const url = process.env.DOLAR_API_URL || "https://dolarapi.com/v1/ambito/dolares";
        try {
            const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
            if (!res.ok)
                throw new Error("Error en la respuesta de la API");
            const raw = await res.json();
            const wanted = ["oficial", "blue", "bolsa"];
            const valoresVenta = wanted
                .map((tipo) => {
                const x = raw.find((v) => String(v.nombre ?? v.casa)
                    .toLowerCase()
                    .includes(tipo));
                return x ? Number(x.venta) : null;
            })
                .filter((val) => val !== null && !isNaN(val));
            if (valoresVenta.length === 0) {
                throw new Error("No se encontraron cotizaciones válidas");
            }
            const mayorCotizacion = Math.max(...valoresVenta);
            return {
                statusCode: 200,
                message: "Cotización más alta obtenida correctamente",
                data: {
                    fuente: "Ámbito Financiero",
                    dolarMasAltoVenta: mayorCotizacion,
                },
            };
        }
        catch {
            throw new InternalServerErrorException("No se pudo obtener la cotización en este momento");
        }
    }
};
CotizacionService = __decorate([
    Injectable()
], CotizacionService);
export { CotizacionService };
//# sourceMappingURL=cotizacion.service.js.map