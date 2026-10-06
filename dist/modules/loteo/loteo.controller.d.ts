import { PaginationDto } from "../../common/dto/pagination.dto.js";
import { LoteoService } from "./loteo.service.js";
import { CreateLoteoDto } from "./dto/create-loteo.dto.js";
import { UpdateLoteoDto } from "./dto/update-loteo.dto.js";
export declare class LoteoController {
    private readonly service;
    constructor(service: LoteoService);
    findAll(query: PaginationDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/loteo.entity.js").Loteo[]>>;
    getById(id: number): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/loteo.entity.js").Loteo>>;
    create(dto: CreateLoteoDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/loteo.entity.js").Loteo>>;
    update(id: number, dto: UpdateLoteoDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/loteo.entity.js").Loteo>>;
    remove(id: number): Promise<import("../../common/dto/response.dto.js").ResponseDTO<unknown>>;
}
