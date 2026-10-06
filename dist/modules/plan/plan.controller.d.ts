import { PaginationDto } from "../../common/dto/pagination.dto.js";
import { PlanService } from "./plan.service.js";
import { CreatePlanDto } from "./dto/create-plan.dto.js";
import { UpdatePlanDto } from "./dto/update-plan.dto.js";
export declare class PlanController {
    private readonly service;
    constructor(service: PlanService);
    findAll(query: PaginationDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/plan.entity.js").PlanPago[]>>;
    getById(id: number): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/plan.entity.js").PlanPago>>;
    create(dto: CreatePlanDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/plan.entity.js").PlanPago>>;
    update(id: number, dto: UpdatePlanDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<import("./entities/plan.entity.js").PlanPago>>;
    remove(id: number): Promise<import("../../common/dto/response.dto.js").ResponseDTO<unknown>>;
}
