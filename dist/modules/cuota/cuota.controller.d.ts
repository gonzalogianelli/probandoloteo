import { PaginationDto } from "../../common/dto/pagination.dto.js";
import { CuotaService } from "./cuota.service.js";
import { CreateCuotaDto } from "./dto/create-cuota.dto.js";
import { UpdateCuotaDto } from "./dto/update-cuota.dto.js";
export declare class CuotaController {
    private readonly service;
    constructor(service: CuotaService);
    findAll(query: PaginationDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/cuota.entity.js").Cuota[]>>;
    getById(id: number): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/cuota.entity.js").Cuota>>;
    create(dto: CreateCuotaDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/cuota.entity.js").Cuota>>;
    update(id: number, dto: UpdateCuotaDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/cuota.entity.js").Cuota>>;
    remove(id: number): Promise<import("../../common/dto/response.dto.js").ResponseDTO<unknown>>;
}
