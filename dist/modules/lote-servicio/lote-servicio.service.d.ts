import { Repository } from "typeorm";
import { ResponseDTO } from "../../common/dto/response.dto.js";
import { LoteServicio } from "./entities/lote-servicio.entity.js";
import { Lote } from "../lote/entities/lote.entity.js";
import { Servicio } from "../servicio/entities/servicio.entity.js";
import { CreateLoteServicioDto } from "./dto/create-lote-servicio.dto.js";
import { UpdateLoteServicioDto } from "./dto/update-lote-servicio.dto.js";
export declare class LoteServicioService {
    private readonly repository;
    private readonly lotes;
    private readonly servicios;
    constructor(repository: Repository<LoteServicio>, lotes: Repository<Lote>, servicios: Repository<Servicio>);
    findAll(skip?: number, limit?: number, orderby?: string): Promise<ResponseDTO<LoteServicio[]>>;
    getById(loteId: number, servicioId: number): Promise<ResponseDTO<LoteServicio>>;
    create(dto: CreateLoteServicioDto): Promise<ResponseDTO<LoteServicio>>;
    update(loteId: number, servicioId: number, dto: UpdateLoteServicioDto): Promise<ResponseDTO<LoteServicio>>;
    remove(loteId: number, servicioId: number): Promise<ResponseDTO>;
}
