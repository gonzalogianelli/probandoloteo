import { PaginationDto } from "../../common/dto/pagination.dto.js";
import { PagoMedioService } from "./pago-medio.service.js";
import { CreatePagoMedioDto } from "./dto/create-pago-medio.dto.js";
import { UpdatePagoMedioDto } from "./dto/update-pago-medio.dto.js";
export declare class PagoMedioController {
    private readonly service;
    constructor(service: PagoMedioService);
    findAll(query: PaginationDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/pago-medio.entity.js").PagoMedio[]>>;
    getById(id: number): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/pago-medio.entity.js").PagoMedio>>;
    create(dto: CreatePagoMedioDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/pago-medio.entity.js").PagoMedio>>;
    update(id: number, dto: UpdatePagoMedioDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/pago-medio.entity.js").PagoMedio>>;
    remove(id: number): Promise<import("../../common/dto/response.dto.js").ResponseDTO<unknown>>;
}
