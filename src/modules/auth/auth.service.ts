import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcryptjs";
import { User } from "../usuario/entities/user.entity.js";
import { LoginDto } from "./dto/login.dto.js";
import { publicUser } from "../../common/utils/user.mapper.js";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwt: JwtService,
  ) {}

  private async findByDniWithPassword(dni: string) {
    return this.users
      .createQueryBuilder("u")
      .select("u")
      .addSelect("u.passwordHash")
      .leftJoinAndSelect("u.role", "role")
      .where("u.dni = :dni", { dni })
      .getOne();
  }

  async login(dto: LoginDto) {
    const u = await this.findByDniWithPassword(dto.dni.trim());
    if (!u) throw new UnauthorizedException("Usuario no encontrado por DNI");
    if (!u.activo) throw new UnauthorizedException("El usuario está inactivo");
/*
    if (dto.rol && u.role?.nombre !== dto.rol)
      throw new UnauthorizedException(
        `No tenés permisos para ingresar como ${dto.rol}`,
      );
*/
    const valid = await bcrypt.compare(dto.password, u.passwordHash);
    if (!valid) throw new UnauthorizedException("La contraseña no coincide");

    const token = this.jwt.sign({
      id: u.id,
      dni: u.dni,
      role: u.role.nombre,
      clientId: u.clientId ?? null,
    });

    return {
      statusCode: 200,
      message: "Inicio de sesión correcto",
      data: { access_token: token, user: publicUser(u) },
    };
  }

  async me(id: number) {
    const u = await this.users.findOne({ where: { id }, relations: ["role"] });
    if (!u) throw new UnauthorizedException("Usuario no encontrado");
    return {
      statusCode: 200,
      message: "Usuario autenticado obtenido correctamente",
      data: publicUser(u),
    };
  }
}
