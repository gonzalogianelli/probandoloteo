var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcryptjs";
import { User } from "../usuario/entities/user.entity.js";
import { publicUser } from "../../common/utils/user.mapper.js";
let AuthService = class AuthService {
    users;
    jwt;
    constructor(users, jwt) {
        this.users = users;
        this.jwt = jwt;
    }
    async findByDniWithPassword(dni) {
        return this.users
            .createQueryBuilder("u")
            .select("u")
            .addSelect("u.passwordHash")
            .leftJoinAndSelect("u.role", "role")
            .where("u.dni = :dni", { dni })
            .getOne();
    }
    async login(dto) {
        const u = await this.findByDniWithPassword(dto.dni.trim());
        if (!u)
            throw new UnauthorizedException("Usuario no encontrado por DNI");
        if (!u.activo)
            throw new UnauthorizedException("El usuario está inactivo");
        const valid = await bcrypt.compare(dto.password, u.passwordHash);
        if (!valid)
            throw new UnauthorizedException("La contraseña no coincide");
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
    async me(id) {
        const u = await this.users.findOne({ where: { id }, relations: ["role"] });
        if (!u)
            throw new UnauthorizedException("Usuario no encontrado");
        return {
            statusCode: 200,
            message: "Usuario autenticado obtenido correctamente",
            data: publicUser(u),
        };
    }
};
AuthService = __decorate([
    Injectable(),
    __param(0, InjectRepository(User)),
    __metadata("design:paramtypes", [Repository,
        JwtService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map