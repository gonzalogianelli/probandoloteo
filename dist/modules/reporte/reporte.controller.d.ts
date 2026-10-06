import { ReporteService } from "./reporte.service.js";
export declare class ReporteController {
    private readonly service;
    constructor(service: ReporteService);
    ventas(): Promise<import("../../common/dto/response.dto.js").ResponseDTO<any>>;
    deudores(): Promise<import("../../common/dto/response.dto.js").ResponseDTO<any[]>>;
}
