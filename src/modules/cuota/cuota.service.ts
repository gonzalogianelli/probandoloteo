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
import { Cuota } from "./entities/cuota.entity.js";
import { CreateCuotaDto } from "./dto/create-cuota.dto.js";
import { UpdateCuotaDto } from "./dto/update-cuota.dto.js";

@Injectable()
export class CuotaService {
  constructor(
    @InjectRepository(Cuota) private readonly repository: Repository<Cuota>,
  ) {}

  async findAll(
    skip = 0,
    limit = 10,
    orderby?: string,
  ): Promise<ResponseDTO<Cuota[]>> {
    const order = resolveOrder(this.repository, orderby);
    const data = await this.repository.find({
      skip,
      take: limit,
      relations: ["venta"],
      ...(order ? { order } : {}),
    });
    return {
      statusCode: HttpStatus.OK,
      message: "cuotas obtenidos correctamente",
      data,
    };
  }

  async getById(id: number): Promise<ResponseDTO<Cuota>> {
    const data = await this.repository.findOne({
      where: { id } as any,
      relations: ["venta"],
    });
    if (!data) throw new NotFoundException("Cuota no encontrado");
    return {
      statusCode: HttpStatus.OK,
      message: "Cuota obtenido correctamente",
      data,
    };
  }

  async create(dto: CreateCuotaDto): Promise<ResponseDTO<Cuota>> {
    try {
      const data = this.repository.create({
        ventaId: dto.ventaId,
        numero: dto.numero,
        fechaVencimiento: dto.fechaVencimiento,
        importe: dto.importe,
        saldo: dto.saldo,
        estado: dto.estado,
      });

      const saved = await this.repository.save(data);

      return {
        statusCode: HttpStatus.CREATED,
        message: "Cuota creada correctamente",
        data: saved,
      };
    } catch (error: any) {
      if (error?.code === "ER_DUP_ENTRY") {
        throw new BadRequestException(
          "Ya existe un registro con alguno de los valores únicos enviados",
        );
      }

      throw new InternalServerErrorException("Error interno al crear Cuota");
    }
  }

  async update(id: number, dto: UpdateCuotaDto): Promise<ResponseDTO<Cuota>> {
    ensureUpdateData(dto);

    const current = await this.repository.findOne({
      where: { id },
      relations: ["venta"],
    });

    if (!current) {
      throw new NotFoundException("Cuota no encontrada");
    }

    try {
      const merged = this.repository.merge(current, dto);
      const saved = await this.repository.save(merged);

      return {
        statusCode: HttpStatus.OK,
        message: "Cuota actualizada correctamente",
        data: saved,
      };
    } catch (error: any) {
      if (error?.code === "ER_DUP_ENTRY") {
        throw new BadRequestException(
          "Ya existe un registro con alguno de los valores únicos enviados",
        );
      }

      throw new InternalServerErrorException(
        "Error interno al actualizar Cuota",
      );
    }
  }

  async remove(id: number): Promise<ResponseDTO> {
    const current = await this.repository.findOne({ where: { id } as any });
    if (!current) throw new NotFoundException("Cuota no encontrado");
    try {
      await this.repository.softRemove(current);
      return {
        statusCode: HttpStatus.OK,
        message: "Cuota eliminado correctamente",
      };
    } catch {
      throw new InternalServerErrorException(
        "No se puede eliminar Cuota porque tiene registros relacionados o ocurrió un error interno",
      );
    }
  }
}
