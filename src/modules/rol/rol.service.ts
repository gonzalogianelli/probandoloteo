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
import { Role } from "./entities/rol.entity.js";
import { CreateRolDto } from "./dto/create-rol.dto.js";
import { UpdateRolDto } from "./dto/update-rol.dto.js";

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}

  async findAll(
    skip = 0,
    limit = 10,
    orderby?: string,
  ): Promise<ResponseDTO<Role[]>> {
    console.log("VALORES RECIBIDOS:", { skip, limit, orderby, tipoSkip: typeof skip, tipoLimit: typeof limit });

    const order = resolveOrder(this.repository, orderby);

    const data = await this.repository.find({
      skip: Number(skip),
      take: Number(limit),
      ...(order ? { order } : {}),
    });

    return {
      statusCode: HttpStatus.OK,
      message: "roles obtenidos correctamente",
      data,
    };
  }

  async getById(id: number): Promise<ResponseDTO<Role>> {
    const data = await this.repository.findOne({
      where: { id },
    });

    if (!data) {
      throw new NotFoundException("Role no encontrado");
    }

    return {
      statusCode: HttpStatus.OK,
      message: "Role obtenido correctamente",
      data,
    };
  }

  async create(dto: CreateRolDto): Promise<ResponseDTO<Role>> {
    try {
      const data = this.repository.create(dto);
      const saved = await this.repository.save(data);

      return {
        statusCode: HttpStatus.CREATED,
        message: "Role creado correctamente",
        data: saved,
      };
    } catch (error: any) {
      if (error?.code === "ER_DUP_ENTRY") {
        throw new BadRequestException(
          "Ya existe un registro con alguno de los valores únicos enviados",
        );
      }

      throw new InternalServerErrorException("Error interno al crear Role");
    }
  }

  async update(id: number, dto: UpdateRolDto): Promise<ResponseDTO<Role>> {
    ensureUpdateData(dto);

    const current = await this.repository.findOne({
      where: { id },
    });

    if (!current) {
      throw new NotFoundException("Role no encontrado");
    }

    try {
      const merged = this.repository.merge(current, dto);
      const saved = await this.repository.save(merged);

      return {
        statusCode: HttpStatus.OK,
        message: "Role actualizado correctamente",
        data: saved,
      };
    } catch (error: any) {
      if (error?.code === "ER_DUP_ENTRY") {
        throw new BadRequestException(
          "Ya existe un registro con alguno de los valores únicos enviados",
        );
      }

      throw new InternalServerErrorException(
        "Error interno al actualizar Role",
      );
    }
  }

  async remove(id: number): Promise<ResponseDTO> {
    const current = await this.repository.findOne({
      where: { id },
    });

    if (!current) {
      throw new NotFoundException("Role no encontrado");
    }

    try {
      await this.repository.softRemove(current);

      return {
        statusCode: HttpStatus.OK,
        message: "Role eliminado correctamente",
      };
    } catch {
      throw new InternalServerErrorException(
        "No se puede eliminar Role porque tiene registros relacionados o ocurrió un error interno",
      );
    }
  }
}
