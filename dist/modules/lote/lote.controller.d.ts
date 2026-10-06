import { LoteService } from "./lote.service.js";
import { CreateLoteDto } from "./dto/create-lote.dto.js";
import { UpdateLoteDto } from "./dto/update-lote.dto.js";
import { PaginationDto } from "../../common/dto/pagination.dto.js";
import { LoteEstado } from "./entities/lote.entity.js";
export declare class LoteController {
    private readonly service;
    constructor(service: LoteService);
    findAll(q: PaginationDto & {
        manzanaId?: number;
        loteoId?: number;
        estado?: LoteEstado;
    }): Promise<import("../../common/dto/response.dto.js").ResponseDTO<any[]>>;
    getById(id: number): Promise<import("../../common/dto/response.dto.js").ResponseDTO<any>>;
    create(dto: CreateLoteDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<any>>;
    update(id: number, dto: UpdateLoteDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<any>>;
    remove(id: number): Promise<import("../../common/dto/response.dto.js").ResponseDTO<unknown>>;
}
