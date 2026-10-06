import { PaginationDto } from "../../common/dto/pagination.dto.js";
import { ServicioService } from "./servicio.service.js";
import { CreateServicioDto } from "./dto/create-servicio.dto.js";
import { UpdateServicioDto } from "./dto/update-servicio.dto.js";
export declare class ServicioController {
    private readonly service;
    constructor(service: ServicioService);
    findAll(query: PaginationDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/servicio.entity.js").Servicio[]>>;
    getById(id: number): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/servicio.entity.js").Servicio>>;
    create(dto: CreateServicioDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/servicio.entity.js").Servicio>>;
    update(id: number, dto: UpdateServicioDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/servicio.entity.js").Servicio>>;
    remove(id: number): Promise<import("../../common/dto/response.dto.js").ResponseDTO<unknown>>;
}
