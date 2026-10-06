import { DataSource, Repository } from "typeorm";
import { Pago } from "./entities/pago.entity.js";
import { PagoCuota } from "../pago-cuota/entities/pago-cuota.entity.js";
import { PagoMedio } from "../pago-medio/entities/pago-medio.entity.js";
import { Venta } from "../venta/entities/venta.entity.js";
import { Cuota } from "../cuota/entities/cuota.entity.js";
import { MedioPago } from "../medio/entities/medio.entity.js";
import { CreatePagoDto } from "./dto/create-pago.dto.js";
import { UpdatePagoDto } from "./dto/update-pago.dto.js";
import { ResponseDTO } from "../../common/dto/response.dto.js";
import { PaginationDto } from "../../common/dto/pagination.dto.js";
export declare class PagoService {
    private readonly pagos;
    private readonly pagoCuotas;
    private readonly pagoMedios;
    private readonly ventas;
    private readonly cuotas;
    private readonly medios;
    private readonly ds;
    constructor(pagos: Repository<Pago>, pagoCuotas: Repository<PagoCuota>, pagoMedios: Repository<PagoMedio>, ventas: Repository<Venta>, cuotas: Repository<Cuota>, medios: Repository<MedioPago>, ds: DataSource);
    findAll(q: PaginationDto, user?: any): Promise<ResponseDTO<any[]>>;
    getById(id: number, user?: any): Promise<ResponseDTO<any>>;
    create(dto: CreatePagoDto, user: any): Promise<ResponseDTO<any>>;
    update(id: number, dto: UpdatePagoDto, user: any): Promise<ResponseDTO<any>>;
    remove(id: number): Promise<ResponseDTO>;
}
