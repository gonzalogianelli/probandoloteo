import { VentaService } from "./venta.service.js";
import { CreateVentaDto } from "./dto/create-venta.dto.js";
import { UpdateVentaDto } from "./dto/update-venta.dto.js";
import { PaginationDto } from "../../common/dto/pagination.dto.js";
export declare class VentaController {
    private readonly service;
    constructor(service: VentaService);
    findAll(q: PaginationDto, req: any): Promise<import("../../common/dto/response.dto.js").ResponseDTO<any[]>>;
    getById(id: number, req: any): Promise<import("../../common/dto/response.dto.js").ResponseDTO<any>>;
    create(dto: CreateVentaDto, req: any): Promise<import("../../common/dto/response.dto.js").ResponseDTO<any>>;
    update(id: number, dto: UpdateVentaDto, req: any): Promise<import("../../common/dto/response.dto.js").ResponseDTO<any>>;
    remove(id: number): Promise<import("../../common/dto/response.dto.js").ResponseDTO<unknown>>;
}
