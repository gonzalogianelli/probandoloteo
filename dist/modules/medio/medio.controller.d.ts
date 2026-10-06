import { PaginationDto } from "../../common/dto/pagination.dto.js";
import { MedioService } from "./medio.service.js";
import { CreateMedioDto } from "./dto/create-medio.dto.js";
import { UpdateMedioDto } from "./dto/update-medio.dto.js";
export declare class MedioController {
    private readonly service;
    constructor(service: MedioService);
    findAll(query: PaginationDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/medio.entity.js").MedioPago[]>>;
    getById(id: number): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/medio.entity.js").MedioPago>>;
    create(dto: CreateMedioDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/medio.entity.js").MedioPago>>;
    update(id: number, dto: UpdateMedioDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/medio.entity.js").MedioPago>>;
    remove(id: number): Promise<import("../../common/dto/response.dto.js").ResponseDTO<unknown>>;
}
