import { PaginationDto } from "../../common/dto/pagination.dto.js";
import { RolService } from "./rol.service.js";
import { CreateRolDto } from "./dto/create-rol.dto.js";
import { UpdateRolDto } from "./dto/update-rol.dto.js";
export declare class RolController {
    private readonly service;
    constructor(service: RolService);
    findAll(query: PaginationDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/rol.entity.js").Role[]>>;
    getById(id: number): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/rol.entity.js").Role>>;
    create(dto: CreateRolDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/rol.entity.js").Role>>;
    update(id: number, dto: UpdateRolDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/rol.entity.js").Role>>;
    remove(id: number): Promise<import("../../common/dto/response.dto.js").ResponseDTO<unknown>>;
}
