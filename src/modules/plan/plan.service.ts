import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ResponseDTO } from "../../common/dto/response.dto.js";
import { resolveOrder, ensureUpdateData } from "../../common/utils/crud.js";
import { PlanPago } from "./entities/plan.entity.js";
import { CreatePlanDto } from "./dto/create-plan.dto.js";
import { UpdatePlanDto } from "./dto/update-plan.dto.js";

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(PlanPago)
    private readonly repository: Repository<PlanPago>,
  ) {}

  async findAll(
    skip = 0,
    limit = 10,
    orderby?: string,
  ): Promise<ResponseDTO<PlanPago[]>> {
    const order = resolveOrder(this.repository, orderby);
    const data = await this.repository.find({
      skip,
      take: limit,
      ...(order ? { order } : {}),
    });
    return {
      statusCode: HttpStatus.OK,
      message: "planes de pago obtenidos correctamente",
      data,
    };
  }

  async getById(id: number): Promise<ResponseDTO<PlanPago>> {
    const data = await this.repository.findOne({ where: { id } });
    if (!data) throw new NotFoundException("PlanPago no encontrado");
    return {
      statusCode: HttpStatus.OK,
      message: "PlanPago obtenido correctamente",
      data,
    };
  }

  async create(dto: CreatePlanDto): Promise<ResponseDTO<PlanPago>> {
    try {
      const data = this.repository.create(dto);
      const saved = await this.repository.save(data);

      return {
        statusCode: HttpStatus.CREATED,
        message: "PlanPago creado correctamente",
        data: saved,
      };
    } catch (error: any) {
      if (error?.code === "ER_DUP_ENTRY") {
        throw new BadRequestException(
          "Ya existe un registro con alguno de los valores únicos enviados",
        );
      }

      throw new InternalServerErrorException("Error interno al crear PlanPago");
    }
  }

  async update(id: number, dto: UpdatePlanDto): Promise<ResponseDTO<PlanPago>> {
    ensureUpdateData(dto);

    const current = await this.repository.findOne({
      where: { id },
    });

    if (!current) {
      throw new NotFoundException("PlanPago no encontrado");
    }

    try {
      const merged = this.repository.merge(current, dto);
      const saved = await this.repository.save(merged);

      return {
        statusCode: HttpStatus.OK,
        message: "PlanPago actualizado correctamente",
        data: saved,
      };
    } catch (error: any) {
      if (error?.code === "ER_DUP_ENTRY") {
        throw new BadRequestException(
          "Ya existe un registro con alguno de los valores únicos enviados",
        );
      }

      throw new InternalServerErrorException(
        "Error interno al actualizar PlanPago",
      );
    }
  }

  async remove(id: number): Promise<ResponseDTO> {
    const current = await this.repository.findOne({ where: { id } });
    if (!current) throw new NotFoundException("PlanPago no encontrado");
    try {
      await this.repository.softRemove(current);
      return {
        statusCode: HttpStatus.OK,
        message: "PlanPago eliminado correctamente",
      };
    } catch {
      throw new InternalServerErrorException(
        "No se puede eliminar PlanPago porque tiene registros relacionados o ocurrió un error interno",
      );
    }
  }
}
