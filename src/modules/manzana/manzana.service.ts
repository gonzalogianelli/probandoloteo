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
import { Manzana } from "./entities/manzana.entity.js";
import { CreateManzanaDto } from "./dto/create-manzana.dto.js";
import { UpdateManzanaDto } from "./dto/update-manzana.dto.js";

@Injectable()
export class ManzanaService {
  constructor(
    @InjectRepository(Manzana) private readonly repository: Repository<Manzana>,
  ) {}

  async findAll(
    skip = 0,
    limit = 10,
    orderby?: string,
  ): Promise<ResponseDTO<Manzana[]>> {
    const order = resolveOrder(this.repository, orderby);
    const data = await this.repository.find({
      skip,
      take: limit,
      relations: ["loteo"],
      ...(order ? { order } : {}),
    });
    return {
      statusCode: HttpStatus.OK,
      message: "manzanas obtenidos correctamente",
      data,
    };
  }

  async getById(id: number): Promise<ResponseDTO<Manzana>> {
    const data = await this.repository.findOne({
      where: { id } as any,
      relations: ["loteo"],
    });
    if (!data) throw new NotFoundException("Manzana no encontrado");
    return {
      statusCode: HttpStatus.OK,
      message: "Manzana obtenido correctamente",
      data,
    };
  }

  async create(dto: CreateManzanaDto): Promise<ResponseDTO<Manzana>> {
    try {
      const data = this.repository.create({
        ...dto,
      });

      const saved = await this.repository.save(data);

      return {
        statusCode: HttpStatus.CREATED,
        message: "Manzana creado correctamente",
        data: saved,
      };
    } catch (error: any) {
      if (error?.code === "ER_DUP_ENTRY") {
        throw new BadRequestException(
          "Ya existe un registro con alguno de los valores únicos enviados",
        );
      }

      throw new InternalServerErrorException("Error interno al crear Manzana");
    }
  }

  async update(
    id: number,
    dto: UpdateManzanaDto,
  ): Promise<ResponseDTO<Manzana>> {
    ensureUpdateData(dto);
    const current = await this.repository.findOne({
      where: { id } as any,
      relations: ["loteo"],
    });
    if (!current) throw new NotFoundException("Manzana no encontrado");
    try {
      const merged = this.repository.merge(current, dto as any);
      const saved = await this.repository.save(merged);
      return {
        statusCode: HttpStatus.OK,
        message: "Manzana actualizado correctamente",
        data: saved as Manzana,
      };
    } catch (error: any) {
      if (error?.code === "ER_DUP_ENTRY")
        throw new BadRequestException(
          "Ya existe un registro con alguno de los valores únicos enviados",
        );
      throw new InternalServerErrorException(
        "Error interno al actualizar Manzana",
      );
    }
  }

  async remove(id: number): Promise<ResponseDTO> {
    const current = await this.repository.findOne({ where: { id } as any });
    if (!current) throw new NotFoundException("Manzana no encontrado");
    try {
      await this.repository.softRemove(current);
      return {
        statusCode: HttpStatus.OK,
        message: "Manzana eliminado correctamente",
      };
    } catch {
      throw new InternalServerErrorException(
        "No se puede eliminar Manzana porque tiene registros relacionados o ocurrió un error interno",
      );
    }
  }
}
