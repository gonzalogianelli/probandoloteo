import { Repository } from "typeorm";
import { ResponseDTO } from "../../common/dto/response.dto.js";
import { PagoMedio } from "./entities/pago-medio.entity.js";
import { CreatePagoMedioDto } from "./dto/create-pago-medio.dto.js";
import { UpdatePagoMedioDto } from "./dto/update-pago-medio.dto.js";
export declare class PagoMedioService {
    private readonly repository;
    constructor(repository: Repository<PagoMedio>);
    findAll(skip?: number, limit?: number, orderby?: string): Promise<ResponseDTO<PagoMedio[]>>;
    getById(id: number): Promise<ResponseDTO<PagoMedio>>;
    create(dto: CreatePagoMedioDto): Promise<ResponseDTO<PagoMedio>>;
    update(id: number, dto: UpdatePagoMedioDto): Promise<ResponseDTO<PagoMedio>>;
    remove(id: number): Promise<ResponseDTO>;
}
