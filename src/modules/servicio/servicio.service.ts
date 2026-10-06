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
import { Servicio } from "./entities/servicio.entity.js";
import { CreateServicioDto } from "./dto/create-servicio.dto.js";
import { UpdateServicioDto } from "./dto/update-servicio.dto.js";

@Injectable()
export class ServicioService {
  constructor(
    @InjectRepository(Servicio)
    private readonly repository: Repository<Servicio>,
  ) {}

  async findAll(
    skip = 0,
    limit = 10,
    orderby?: string,
  ): Promise<ResponseDTO<Servicio[]>> {
    const order = resolveOrder(this.repository, orderby);

    const data = await this.repository.find({
      skip,
      take: limit,
      ...(order ? { order } : {}),
    });

    return {
      statusCode: HttpStatus.OK,
      message: "servicios obtenidos correctamente",
      data,
    };
  }

  async getById(id: number): Promise<ResponseDTO<Servicio>> {
    const data = await this.repository.findOne({
      where: { id },
    });

    if (!data) {
      throw new NotFoundException("Servicio no encontrado");
    }

    return {
      statusCode: HttpStatus.OK,
      message: "Servicio obtenido correctamente",
      data,
    };
  }

  async create(dto: CreateServicioDto): Promise<ResponseDTO<Servicio>> {
    try {
      const data = this.repository.create(dto);
      const saved = await this.repository.save(data);

      return {
        statusCode: HttpStatus.CREATED,
        message: "Servicio creado correctamente",
        data: saved,
      };
    } catch (error: any) {
      if (error?.code === "ER_DUP_ENTRY") {
        throw new BadRequestException(
          "Ya existe un registro con alguno de los valores únicos enviados",
        );
      }

      throw new InternalServerErrorException("Error interno al crear Servicio");
    }
  }

  async update(
    id: number,
    dto: UpdateServicioDto,
  ): Promise<ResponseDTO<Servicio>> {
    ensureUpdateData(dto);

    const current = await this.repository.findOne({
      where: { id },
    });

    if (!current) {
      throw new NotFoundException("Servicio no encontrado");
    }

    try {
      const merged = this.repository.merge(current, dto);
      const saved = await this.repository.save(merged);

      return {
        statusCode: HttpStatus.OK,
        message: "Servicio actualizado correctamente",
        data: saved,
      };
    } catch (error: any) {
      if (error?.code === "ER_DUP_ENTRY") {
        throw new BadRequestException(
          "Ya existe un registro con alguno de los valores únicos enviados",
        );
      }

      throw new InternalServerErrorException(
        "Error interno al actualizar Servicio",
      );
    }
  }

  async remove(id: number): Promise<ResponseDTO> {
    const current = await this.repository.findOne({
      where: { id },
    });

    if (!current) {
      throw new NotFoundException("Servicio no encontrado");
    }

    try {
      await this.repository.softRemove(current);

      return {
        statusCode: HttpStatus.OK,
        message: "Servicio eliminado correctamente",
      };
    } catch {
      throw new InternalServerErrorException(
        "No se puede eliminar Servicio porque tiene registros relacionados o ocurrió un error interno",
      );
    }
  }
}
