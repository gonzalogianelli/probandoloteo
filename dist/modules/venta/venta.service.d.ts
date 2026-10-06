import { DataSource, Repository } from "typeorm";
import { Venta } from "./entities/venta.entity.js";
import { Lote } from "../lote/entities/lote.entity.js";
import { PlanPago } from "../plan/entities/plan.entity.js";
import { User } from "../usuario/entities/user.entity.js";
import { Cuota } from "../cuota/entities/cuota.entity.js";
import { CreateVentaDto } from "./dto/create-venta.dto.js";
import { UpdateVentaDto } from "./dto/update-venta.dto.js";
import { ResponseDTO } from "../../common/dto/response.dto.js";
import { PaginationDto } from "../../common/dto/pagination.dto.js";
export declare class VentaService {
    private readonly ventas;
    private readonly lotes;
    private readonly planes;
    private readonly users;
    private readonly cuotas;
    private readonly ds;
    constructor(ventas: Repository<Venta>, lotes: Repository<Lote>, planes: Repository<PlanPago>, users: Repository<User>, cuotas: Repository<Cuota>, ds: DataSource);
    findAll(q: PaginationDto, user?: any): Promise<ResponseDTO<any[]>>;
    getById(id: number, user?: any): Promise<ResponseDTO<any>>;
    create(dto: CreateVentaDto, user?: any): Promise<ResponseDTO<any>>;
    update(id: number, dto: UpdateVentaDto, user?: any): Promise<ResponseDTO<any>>;
    remove(id: number): Promise<ResponseDTO>;
}
