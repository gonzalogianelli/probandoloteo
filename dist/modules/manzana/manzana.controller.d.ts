import { PaginationDto } from "../../common/dto/pagination.dto.js";
import { ManzanaService } from "./manzana.service.js";
import { CreateManzanaDto } from "./dto/create-manzana.dto.js";
import { UpdateManzanaDto } from "./dto/update-manzana.dto.js";
export declare class ManzanaController {
    private readonly service;
    constructor(service: ManzanaService);
    findAll(query: PaginationDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/manzana.entity.js").Manzana[]>>;
    getById(id: number): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/manzana.entity.js").Manzana>>;
    create(dto: CreateManzanaDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/manzana.entity.js").Manzana>>;
    update(id: number, dto: UpdateManzanaDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/manzana.entity.js").Manzana>>;
    remove(id: number): Promise<import("../../common/dto/response.dto.js").ResponseDTO<unknown>>;
}
