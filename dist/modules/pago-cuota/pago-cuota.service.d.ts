import { Repository } from "typeorm";
import { ResponseDTO } from "../../common/dto/response.dto.js";
import { PagoCuota } from "./entities/pago-cuota.entity.js";
import { CreatePagoCuotaDto } from "./dto/create-pago-cuota.dto.js";
import { UpdatePagoCuotaDto } from "./dto/update-pago-cuota.dto.js";
export declare class PagoCuotaService {
    private readonly repository;
    constructor(repository: Repository<PagoCuota>);
    findAll(skip?: number, limit?: number, orderby?: string): Promise<ResponseDTO<PagoCuota[]>>;
    getById(id: number): Promise<ResponseDTO<PagoCuota>>;
    create(dto: CreatePagoCuotaDto): Promise<ResponseDTO<PagoCuota>>;
    update(id: number, dto: UpdatePagoCuotaDto): Promise<ResponseDTO<PagoCuota>>;
    remove(id: number): Promise<ResponseDTO>;
}
