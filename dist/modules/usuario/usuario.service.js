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
import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import bcrypt from "bcryptjs";
import { User } from "./entities/user.entity.js";
import { publicUser } from "../../common/utils/user.mapper.js";
import { ensureUpdateData, resolveOrder } from "../../common/utils/crud.js";
let UsuarioService = class UsuarioService {
    users;
    constructor(users) {
        this.users = users;
    }
    async findAll(query) {
        const order = resolveOrder(this.users, query.orderby) ?? {
            apellido: "ASC",
        };
        const users = await this.users.find({
            skip: query.skip,
            take: query.limit,
            relations: ["role"],
            order: order,
        });
        return {
            statusCode: HttpStatus.OK,
            message: "Usuarios obtenidos correctamente",
            data: users.map(publicUser),
        };
    }
    async getById(id) {
        const user = await this.users.findOne({
            where: { id },
            relations: ["role"],
        });
        if (!user)
            throw new NotFoundException("Usuario no encontrado");
        return {
            statusCode: HttpStatus.OK,
            message: "Usuario obtenido correctamente",
            data: publicUser(user),
        };
    }
    async create(dto) {
        try {
            const { password, ...userData } = dto;
            const user = this.users.create({
                ...userData,
                passwordHash: await bcrypt.hash(password, 10),
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
        }
        catch (error) {
            if (error?.code === "ER_DUP_ENTRY")
                throw new BadRequestException("El DNI o email ya se encuentra registrado");
            throw new InternalServerErrorException("Error interno al crear el usuario");
        }
    }
    async update(id, dto) {
        ensureUpdateData(dto);
        const user = await this.users.findOne({
            where: { id },
            relations: ["role"],
        });
        if (!user)
            throw new NotFoundException("Usuario no encontrado");
        try {
            const data = { ...dto };
            delete data.password;
            if (dto.password)
                data.passwordHash = await bcrypt.hash(dto.password, 10);
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
        }
        catch (error) {
            if (error?.code === "ER_DUP_ENTRY")
                throw new BadRequestException("El DNI o email ya se encuentra registrado");
            throw new InternalServerErrorException("Error interno al actualizar el usuario");
        }
    }
    async remove(id) {
        const user = await this.users.findOne({ where: { id } });
        if (!user)
            throw new NotFoundException("Usuario no encontrado");
        try {
            await this.users.softRemove(user);
            return {
                statusCode: HttpStatus.OK,
                message: "Usuario eliminado correctamente",
            };
        }
        catch {
            throw new InternalServerErrorException("No se puede eliminar el usuario porque tiene registros relacionados");
        }
    }
};
UsuarioService = __decorate([
    Injectable(),
    __param(0, InjectRepository(User)),
    __metadata("design:paramtypes", [Repository])
], UsuarioService);
export { UsuarioService };
//# sourceMappingURL=usuario.service.js.map