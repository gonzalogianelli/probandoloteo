import { CobranzaService } from "./cobranza.service.js";
export declare class CobranzaController {
    private readonly service;
    constructor(service: CobranzaService);
    deudores(): Promise<import("../../common/dto/response.dto.js").ResponseDTO<any[]>>;
    cuenta(id: number, req: any): Promise<import("../../common/dto/response.dto.js").ResponseDTO<any>>;
}
