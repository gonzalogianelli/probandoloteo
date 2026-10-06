import { Repository } from "typeorm";
import { ResponseDTO } from "../../common/dto/response.dto.js";
import { PlanPago } from "./entities/plan.entity.js";
import { CreatePlanDto } from "./dto/create-plan.dto.js";
import { UpdatePlanDto } from "./dto/update-plan.dto.js";
export declare class PlanService {
    private readonly repository;
    constructor(repository: Repository<PlanPago>);
    findAll(skip?: number, limit?: number, orderby?: string): Promise<ResponseDTO<PlanPago[]>>;
    getById(id: number): Promise<ResponseDTO<PlanPago>>;
    create(dto: CreatePlanDto): Promise<ResponseDTO<PlanPago>>;
    update(id: number, dto: UpdatePlanDto): Promise<ResponseDTO<PlanPago>>;
    remove(id: number): Promise<ResponseDTO>;
}
