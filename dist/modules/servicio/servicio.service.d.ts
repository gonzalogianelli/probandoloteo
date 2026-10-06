import { Repository } from "typeorm";
import { ResponseDTO } from "../../common/dto/response.dto.js";
import { Servicio } from "./entities/servicio.entity.js";
import { CreateServicioDto } from "./dto/create-servicio.dto.js";
import { UpdateServicioDto } from "./dto/update-servicio.dto.js";
export declare class ServicioService {
    private readonly repository;
    constructor(repository: Repository<Servicio>);
    findAll(skip?: number, limit?: number, orderby?: string): Promise<ResponseDTO<Servicio[]>>;
    getById(id: number): Promise<ResponseDTO<Servicio>>;
    create(dto: CreateServicioDto): Promise<ResponseDTO<Servicio>>;
    update(id: number, dto: UpdateServicioDto): Promise<ResponseDTO<Servicio>>;
    remove(id: number): Promise<ResponseDTO>;
}
