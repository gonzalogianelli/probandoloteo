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
import { MedioPago } from "./entities/medio.entity.js";
import { CreateMedioDto } from "./dto/create-medio.dto.js";
import { UpdateMedioDto } from "./dto/update-medio.dto.js";

@Injectable()
export class MedioService {
  constructor(
    @InjectRepository(MedioPago)
    private readonly repository: Repository<MedioPago>,
  ) {}

  async findAll(
    skip = 0,
    limit = 10,
    orderby?: string,
  ): Promise<ResponseDTO<MedioPago[]>> {
    const order = resolveOrder(this.repository, orderby);
    const data = await this.repository.find({
      skip,
      take: limit,
      ...(order ? { order } : {}),
    });
    return {
      statusCode: HttpStatus.OK,
      message: "medios de pago obtenidos correctamente",
      data,
    };
  }

  async getById(id: number): Promise<ResponseDTO<MedioPago>> {
    const data = await this.repository.findOne({ where: { id } as any });
    if (!data) throw new NotFoundException("MedioPago no encontrado");
    return {
      statusCode: HttpStatus.OK,
      message: "MedioPago obtenido correctamente",
      data,
    };
  }

  async create(dto: CreateMedioDto): Promise<ResponseDTO<MedioPago>> {
    try {
      const data = this.repository.create({ ...dto });
      const saved = await this.repository.save(data);
      return {
        statusCode: HttpStatus.CREATED,
        message: "MedioPago creado correctamente",
        data: saved,
      };
    } catch (error: any) {
      if (error?.code === "ER_DUP_ENTRY")
        throw new BadRequestException(
          "Ya existe un registro con alguno de los valores únicos enviados",
        );
      throw new InternalServerErrorException(
        "Error interno al crear MedioPago",
      );
    }
  }

  async update(
    id: number,
    dto: UpdateMedioDto,
  ): Promise<ResponseDTO<MedioPago>> {
    ensureUpdateData(dto);
    const current = await this.repository.findOne({ where: { id } as any });
    if (!current) throw new NotFoundException("MedioPago no encontrado");
    try {
      const merged = this.repository.merge(current, { ...dto });
      const saved = await this.repository.save(merged);
      return {
        statusCode: HttpStatus.OK,
        message: "MedioPago actualizado correctamente",
        data: saved,
      };
    } catch (error: any) {
      if (error?.code === "ER_DUP_ENTRY")
        throw new BadRequestException(
          "Ya existe un registro con alguno de los valores únicos enviados",
        );
      throw new InternalServerErrorException(
        "Error interno al actualizar MedioPago",
      );
    }
  }

  async remove(id: number): Promise<ResponseDTO> {
    const current = await this.repository.findOne({ where: { id } as any });
    if (!current) throw new NotFoundException("MedioPago no encontrado");
    try {
      await this.repository.softRemove(current);
      return {
        statusCode: HttpStatus.OK,
        message: "MedioPago eliminado correctamente",
      };
    } catch {
      throw new InternalServerErrorException(
        "No se puede eliminar MedioPago porque tiene registros relacionados o ocurrió un error interno",
      );
    }
  }
}
