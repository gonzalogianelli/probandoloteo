import { Repository } from "typeorm";
import { ResponseDTO } from "../../common/dto/response.dto.js";
import { Loteo } from "./entities/loteo.entity.js";
import { CreateLoteoDto } from "./dto/create-loteo.dto.js";
import { UpdateLoteoDto } from "./dto/update-loteo.dto.js";
export declare class LoteoService {
    private readonly repository;
    constructor(repository: Repository<Loteo>);
    findAll(skip?: number, limit?: number, orderby?: string): Promise<ResponseDTO<Loteo[]>>;
    getById(id: number): Promise<ResponseDTO<Loteo>>;
    create(dto: CreateLoteoDto): Promise<ResponseDTO<Loteo>>;
    update(id: number, dto: UpdateLoteoDto): Promise<ResponseDTO<Loteo>>;
    remove(id: number): Promise<ResponseDTO>;
}
