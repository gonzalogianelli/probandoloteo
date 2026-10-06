import { Repository } from "typeorm";
import { Venta } from "../venta/entities/venta.entity.js";
import { Pago } from "../pago/entities/pago.entity.js";
import { ReporteService } from "../reporte/reporte.service.js";
export declare class DashboardService {
    private readonly ventas;
    private readonly pagos;
    private readonly reporte;
    constructor(ventas: Repository<Venta>, pagos: Repository<Pago>, reporte: ReporteService);
    dashboard(): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
}
