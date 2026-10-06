import { PaginationDto } from "../../common/dto/pagination.dto.js";
import { PagoCuotaService } from "./pago-cuota.service.js";
import { CreatePagoCuotaDto } from "./dto/create-pago-cuota.dto.js";
import { UpdatePagoCuotaDto } from "./dto/update-pago-cuota.dto.js";
export declare class PagoCuotaController {
    private readonly service;
    constructor(service: PagoCuotaService);
    findAll(query: PaginationDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/pago-cuota.entity.js").PagoCuota[]>>;
    getById(id: number): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/pago-cuota.entity.js").PagoCuota>>;
    create(dto: CreatePagoCuotaDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/pago-cuota.entity.js").PagoCuota>>;
    update(id: number, dto: UpdatePagoCuotaDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/pago-cuota.entity.js").PagoCuota>>;
    remove(id: number): Promise<import("../../common/dto/response.dto.js").ResponseDTO<unknown>>;
}
