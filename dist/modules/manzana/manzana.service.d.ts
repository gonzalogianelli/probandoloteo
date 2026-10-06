import { Repository } from "typeorm";
import { ResponseDTO } from "../../common/dto/response.dto.js";
import { Manzana } from "./entities/manzana.entity.js";
import { CreateManzanaDto } from "./dto/create-manzana.dto.js";
import { UpdateManzanaDto } from "./dto/update-manzana.dto.js";
export declare class ManzanaService {
    private readonly repository;
    constructor(repository: Repository<Manzana>);
    findAll(skip?: number, limit?: number, orderby?: string): Promise<ResponseDTO<Manzana[]>>;
    getById(id: number): Promise<ResponseDTO<Manzana>>;
    create(dto: CreateManzanaDto): Promise<ResponseDTO<Manzana>>;
    update(id: number, dto: UpdateManzanaDto): Promise<ResponseDTO<Manzana>>;
    remove(id: number): Promise<ResponseDTO>;
}
