import { PagoService } from "./pago.service.js";
import { CreatePagoDto } from "./dto/create-pago.dto.js";
import { UpdatePagoDto } from "./dto/update-pago.dto.js";
import { PaginationDto } from "../../common/dto/pagination.dto.js";
export declare class PagoController {
    private readonly service;
    constructor(service: PagoService);
    findAll(q: PaginationDto, req: any): Promise<import("../../common/dto/response.dto.js").ResponseDTO<any[]>>;
    getById(id: number, req: any): Promise<import("../../common/dto/response.dto.js").ResponseDTO<any>>;
    create(dto: CreatePagoDto, req: any): Promise<import("../../common/dto/response.dto.js").ResponseDTO<any>>;
    update(id: number, dto: UpdatePagoDto, req: any): Promise<import("../../common/dto/response.dto.js").ResponseDTO<any>>;
    remove(id: number): Promise<import("../../common/dto/response.dto.js").ResponseDTO<unknown>>;
}
