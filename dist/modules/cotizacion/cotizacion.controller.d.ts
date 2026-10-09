import { CotizacionService } from "./cotizacion.service.js";
export declare class CotizacionController {
    private readonly service;
    constructor(service: CotizacionService);
    dolar(): Promise<{
        statusCode: number;
        message: string;
        data: {
            fuente: string;
            dolarMasAltoVenta: number;
        };
    }>;
}
