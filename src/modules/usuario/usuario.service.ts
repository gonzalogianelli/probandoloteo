import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import bcrypt from "bcryptjs";
import { User } from "./entities/user.entity.js";
import { CreateUsuarioDto } from "./dto/create-usuario.dto.js";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto.js";
import { ResponseDTO } from "../../common/dto/response.dto.js";
import { PaginationDto } from "../../common/dto/pagination.dto.js";
import { publicUser } from "../../common/utils/user.mapper.js";
import { ensureUpdateData, resolveOrder } from "../../common/utils/crud.js";

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async findAll(
    query: PaginationDto,
  ): Promise<ResponseDTO<ReturnType<typeof publicUser>[]>> {
    const order = resolveOrder(this.users, query.orderby) ?? {
      apellido: "ASC",
    };
    const users = await this.users.find({
      skip: query.skip,
      take: query.limit,
      relations: ["role"],
      order: order as any,
    });
    return {
      statusCode: HttpStatus.OK,
      message: "Usuarios obtenidos correctamente",
      data: users.map(publicUser),
    };
  }

  async getById(
    id: number,
  ): Promise<ResponseDTO<ReturnType<typeof publicUser>>> {
    const user = await this.users.findOne({
      where: { id },
      relations: ["role"],
    });
    if (!user) throw new NotFoundException("Usuario no encontrado");
    return {
      statusCode: HttpStatus.OK,
      message: "Usuario obtenido correctamente",
      data: publicUser(user),
    };
  }

  async create(
    dto: CreateUsuarioDto,
  ): Promise<ResponseDTO<ReturnType<typeof publicUser>>> {
    try {
      const { password, ...userData } = dto;
      const user = this.users.create({
        ...userData,
        passwordHash: await bcrypt.hash(password, 10),
        /*clientId: dto.clientId ?? null,*/
      });
      const saved = await this.users.save(user);
      const full = await this.users.findOneOrFail({
        where: { id: saved.id },
        relations: ["role"],
      });
      return {
        statusCode: HttpStatus.CREATED,
        message: "Usuario creado correctamente",
        data: publicUser(full),
      };
    } catch (error: any) {
      if (error?.code === "ER_DUP_ENTRY")
        throw new BadRequestException(
          "El DNI o email ya se encuentra registrado",
        );
      throw new InternalServerErrorException(
        "Error interno al crear el usuario",
      );
    }
  }

  async update(
    id: number,
    dto: UpdateUsuarioDto,
  ): Promise<ResponseDTO<ReturnType<typeof publicUser>>> {
    ensureUpdateData(dto);
    const user = await this.users.findOne({
      where: { id },
      relations: ["role"],
    });
    if (!user) throw new NotFoundException("Usuario no encontrado");
    try {
      const data: any = { ...dto };
      delete data.password;
      if (dto.password) data.passwordHash = await bcrypt.hash(dto.password, 10);
      this.users.merge(user, data);
      await this.users.save(user);
      const full = await this.users.findOneOrFail({
        where: { id },
        relations: ["role"],
      });
      return {
        statusCode: HttpStatus.OK,
        message: "Usuario actualizado correctamente",
        data: publicUser(full),
      };
    } catch (error: any) {
      if (error?.code === "ER_DUP_ENTRY")
        throw new BadRequestException(
          "El DNI o email ya se encuentra registrado",
        );
      throw new InternalServerErrorException(
        "Error interno al actualizar el usuario",
      );
    }
  }

  async remove(id: number): Promise<ResponseDTO> {
    const user = await this.users.findOne({ where: { id } });
    if (!user) throw new NotFoundException("Usuario no encontrado");
    try {
      await this.users.softRemove(user);
      return {
        statusCode: HttpStatus.OK,
        message: "Usuario eliminado correctamente",
      };
    } catch {
      throw new InternalServerErrorException(
        "No se puede eliminar el usuario porque tiene registros relacionados",
      );
    }
  }
}
