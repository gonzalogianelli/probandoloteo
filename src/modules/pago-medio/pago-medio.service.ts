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
import { PagoMedio } from "./entities/pago-medio.entity.js";
import { CreatePagoMedioDto } from "./dto/create-pago-medio.dto.js";
import { UpdatePagoMedioDto } from "./dto/update-pago-medio.dto.js";

@Injectable()
export class PagoMedioService {
  constructor(
    @InjectRepository(PagoMedio)
    private readonly repository: Repository<PagoMedio>,
  ) {}

  async findAll(
    skip = 0,
    limit = 10,
    orderby?: string,
  ): Promise<ResponseDTO<PagoMedio[]>> {
    const order = resolveOrder(this.repository, orderby);
    const data = await this.repository.find({
      skip,
      take: limit,
      relations: ["pago", "medioPago"],
      ...(order ? { order } : {}),
    });
    return {
      statusCode: HttpStatus.OK,
      message: "medios de pago aplicados obtenidos correctamente",
      data,
    };
  }

  async getById(id: number): Promise<ResponseDTO<PagoMedio>> {
    const data = await this.repository.findOne({
      where: { id } as any,
      relations: ["pago", "medioPago"],
    });
    if (!data) throw new NotFoundException("PagoMedio no encontrado");
    return {
      statusCode: HttpStatus.OK,
      message: "PagoMedio obtenido correctamente",
      data,
    };
  }

  async create(dto: CreatePagoMedioDto): Promise<ResponseDTO<PagoMedio>> {
    try {
      const data = this.repository.create({
        ...dto,
      });

      const saved = await this.repository.save(data);

      return {
        statusCode: HttpStatus.CREATED,
        message: "PagoMedio creado correctamente",
        data: saved,
      };
    } catch (error: any) {
      if (error?.code === "ER_DUP_ENTRY") {
        throw new BadRequestException(
          "Ya existe un registro con alguno de los valores únicos enviados",
        );
      }

      throw new InternalServerErrorException(
        "Error interno al crear PagoMedio",
      );
    }
  }

  async update(
    id: number,
    dto: UpdatePagoMedioDto,
  ): Promise<ResponseDTO<PagoMedio>> {
    ensureUpdateData(dto);

    const current = await this.repository.findOne({
      where: { id },
      relations: ["pago", "medioPago"],
    });

    if (!current) {
      throw new NotFoundException("PagoMedio no encontrado");
    }

    try {
      const merged = this.repository.merge(current, {
        ...dto,
      });

      const saved = await this.repository.save(merged);

      return {
        statusCode: HttpStatus.OK,
        message: "PagoMedio actualizado correctamente",
        data: saved,
      };
    } catch (error: any) {
      if (error?.code === "ER_DUP_ENTRY") {
        throw new BadRequestException(
          "Ya existe un registro con alguno de los valores únicos enviados",
        );
      }

      throw new InternalServerErrorException(
        "Error interno al actualizar PagoMedio",
      );
    }
  }

  async remove(id: number): Promise<ResponseDTO> {
    const current = await this.repository.findOne({ where: { id } as any });
    if (!current) throw new NotFoundException("PagoMedio no encontrado");
    try {
      await this.repository.softRemove(current);
      return {
        statusCode: HttpStatus.OK,
        message: "PagoMedio eliminado correctamente",
      };
    } catch {
      throw new InternalServerErrorException(
        "No se puede eliminar PagoMedio porque tiene registros relacionados o ocurrió un error interno",
      );
    }
  }
}
