import { Repository } from "typeorm";
import { ResponseDTO } from "../../common/dto/response.dto.js";
import { Cuota } from "./entities/cuota.entity.js";
import { CreateCuotaDto } from "./dto/create-cuota.dto.js";
import { UpdateCuotaDto } from "./dto/update-cuota.dto.js";
export declare class CuotaService {
    private readonly repository;
    constructor(repository: Repository<Cuota>);
    findAll(skip?: number, limit?: number, orderby?: string): Promise<ResponseDTO<Cuota[]>>;
    getById(id: number): Promise<ResponseDTO<Cuota>>;
    create(dto: CreateCuotaDto): Promise<ResponseDTO<Cuota>>;
    update(id: number, dto: UpdateCuotaDto): Promise<ResponseDTO<Cuota>>;
    remove(id: number): Promise<ResponseDTO>;
}
