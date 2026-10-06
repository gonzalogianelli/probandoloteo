import { Repository } from "typeorm";
import { ResponseDTO } from "../../common/dto/response.dto.js";
import { Role } from "./entities/rol.entity.js";
import { CreateRolDto } from "./dto/create-rol.dto.js";
import { UpdateRolDto } from "./dto/update-rol.dto.js";
export declare class RolService {
    private readonly repository;
    constructor(repository: Repository<Role>);
    findAll(skip?: number, limit?: number, orderby?: string): Promise<ResponseDTO<Role[]>>;
    getById(id: number): Promise<ResponseDTO<Role>>;
    create(dto: CreateRolDto): Promise<ResponseDTO<Role>>;
    update(id: number, dto: UpdateRolDto): Promise<ResponseDTO<Role>>;
    remove(id: number): Promise<ResponseDTO>;
}
