import { PaginationDto } from "../../common/dto/pagination.dto.js";
import { CreateLoteServicioDto } from "./dto/create-lote-servicio.dto.js";
import { UpdateLoteServicioDto } from "./dto/update-lote-servicio.dto.js";
import { LoteServicioService } from "./lote-servicio.service.js";
export declare class LoteServicioController {
    private readonly service;
    constructor(service: LoteServicioService);
    findAll(query: PaginationDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/lote-servicio.entity.js").LoteServicio[]>>;
    getById(loteId: number, servicioId: number): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/lote-servicio.entity.js").LoteServicio>>;
    create(dto: CreateLoteServicioDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/lote-servicio.entity.js").LoteServicio>>;
    update(loteId: number, servicioId: number, dto: UpdateLoteServicioDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/lote-servicio.entity.js").LoteServicio>>;
    remove(loteId: number, servicioId: number): Promise<import("../../common/dto/response.dto.js").ResponseDTO<unknown>>;
}
