import { Repository } from "typeorm";
import { Lote } from "../lote/entities/lote.entity.js";
import { CobranzaService } from "../cobranza/cobranza.service.js";
import { ResponseDTO } from "../../common/dto/response.dto.js";
export declare class ReporteService {
    private readonly lotes;
    private readonly cobranza;
    constructor(lotes: Repository<Lote>, cobranza: CobranzaService);
    reporteVentas(): Promise<ResponseDTO<any>>;
    deudores(): Promise<ResponseDTO<any[]>>;
}
