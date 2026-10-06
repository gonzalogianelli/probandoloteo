import { DataSource, Repository } from "typeorm";
import { Lote, LoteEstado } from "./entities/lote.entity.js";
import { Manzana } from "../manzana/entities/manzana.entity.js";
import { Servicio } from "../servicio/entities/servicio.entity.js";
import { Venta } from "../venta/entities/venta.entity.js";
import { LoteServicio } from "../lote-servicio/entities/lote-servicio.entity.js";
import { CreateLoteDto } from "./dto/create-lote.dto.js";
import { UpdateLoteDto } from "./dto/update-lote.dto.js";
import { ResponseDTO } from "../../common/dto/response.dto.js";
import { PaginationDto } from "../../common/dto/pagination.dto.js";
export declare class LoteService {
    private readonly lotes;
    private readonly manzanas;
    private readonly servicios;
    private readonly loteServicios;
    private readonly ventas;
    private readonly dataSource;
    constructor(lotes: Repository<Lote>, manzanas: Repository<Manzana>, servicios: Repository<Servicio>, loteServicios: Repository<LoteServicio>, ventas: Repository<Venta>, dataSource: DataSource);
    private decorate;
    findAll(q: PaginationDto & {
        manzanaId?: number;
        loteoId?: number;
        estado?: LoteEstado;
    }): Promise<ResponseDTO<any[]>>;
    statusLabel(status: LoteEstado): string;
    getById(id: number): Promise<ResponseDTO<any>>;
    create(dto: CreateLoteDto): Promise<ResponseDTO<any>>;
    update(id: number, dto: UpdateLoteDto): Promise<ResponseDTO<any>>;
    remove(id: number): Promise<ResponseDTO>;
}
