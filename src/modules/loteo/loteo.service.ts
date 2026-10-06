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
import { Loteo } from "./entities/loteo.entity.js";
import { CreateLoteoDto } from "./dto/create-loteo.dto.js";
import { UpdateLoteoDto } from "./dto/update-loteo.dto.js";

@Injectable()
export class LoteoService {
  constructor(
    @InjectRepository(Loteo) private readonly repository: Repository<Loteo>,
  ) {}

  async findAll(
    skip = 0,
    limit = 10,
    orderby?: string,
  ): Promise<ResponseDTO<Loteo[]>> {
    const order = resolveOrder(this.repository, orderby);
    const data = await this.repository.find({
      skip,
      take: limit,
      ...(order ? { order } : {}),
    });
    return {
      statusCode: HttpStatus.OK,
      message: "loteos obtenidos correctamente",
      data,
    };
  }

  async getById(id: number): Promise<ResponseDTO<Loteo>> {
    const data = await this.repository.findOne({ where: { id } as any });
    if (!data) throw new NotFoundException("Loteo no encontrado");
    return {
      statusCode: HttpStatus.OK,
      message: "Loteo obtenido correctamente",
      data,
    };
  }

  async create(dto: CreateLoteoDto): Promise<ResponseDTO<Loteo>> {
    try {
      const data = this.repository.create(dto);
      const saved = await this.repository.save(data);

      return {
        statusCode: HttpStatus.CREATED,
        message: "Loteo creado correctamente",
        data: saved,
      };
    } catch (error: any) {
      if (error?.code === "ER_DUP_ENTRY")
        throw new BadRequestException(
          "Ya existe un registro con alguno de los valores únicos enviados",
        );
      throw new InternalServerErrorException("Error interno al crear Loteo");
    }
  }

  async update(id: number, dto: UpdateLoteoDto): Promise<ResponseDTO<Loteo>> {
    ensureUpdateData(dto);
    const current = await this.repository.findOne({ where: { id } as any });
    if (!current) throw new NotFoundException("Loteo no encontrado");
    try {
      const merged = this.repository.merge(current, dto);
      const saved = await this.repository.save(merged);
      return {
        statusCode: HttpStatus.OK,
        message: "Loteo actualizado correctamente",
        data: saved as Loteo,
      };
    } catch (error: any) {
      if (error?.code === "ER_DUP_ENTRY")
        throw new BadRequestException(
          "Ya existe un registro con alguno de los valores únicos enviados",
        );
      throw new InternalServerErrorException(
        "Error interno al actualizar Loteo",
      );
    }
  }

  async remove(id: number): Promise<ResponseDTO> {
    const current = await this.repository.findOne({ where: { id } as any });
    if (!current) throw new NotFoundException("Loteo no encontrado");
    try {
      await this.repository.softRemove(current);
      return {
        statusCode: HttpStatus.OK,
        message: "Loteo eliminado correctamente",
      };
    } catch {
      throw new InternalServerErrorException(
        "No se puede eliminar Loteo porque tiene registros relacionados o ocurrió un error interno",
      );
    }
  }
}
