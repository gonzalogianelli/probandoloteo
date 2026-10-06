import { Repository } from "typeorm";
import { ResponseDTO } from "../../common/dto/response.dto.js";
import { MedioPago } from "./entities/medio.entity.js";
import { CreateMedioDto } from "./dto/create-medio.dto.js";
import { UpdateMedioDto } from "./dto/update-medio.dto.js";
export declare class MedioService {
    private readonly repository;
    constructor(repository: Repository<MedioPago>);
    findAll(skip?: number, limit?: number, orderby?: string): Promise<ResponseDTO<MedioPago[]>>;
    getById(id: number): Promise<ResponseDTO<MedioPago>>;
    create(dto: CreateMedioDto): Promise<ResponseDTO<MedioPago>>;
    update(id: number, dto: UpdateMedioDto): Promise<ResponseDTO<MedioPago>>;
    remove(id: number): Promise<ResponseDTO>;
}
