import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { User } from "../usuario/entities/user.entity.js";
import { LoginDto } from "./dto/login.dto.js";
export declare class AuthService {
    private readonly users;
    private readonly jwt;
    constructor(users: Repository<User>, jwt: JwtService);
    private findByDniWithPassword;
    login(dto: LoginDto): Promise<{
        statusCode: number;
        message: string;
        data: {
            access_token: string;
            user: {
                id: number;
                roleId: number;
                role: string;
                clientId: number | null;
                nombre: string;
                apellido: string;
                dni: string;
                email: string;
                telefono: string | null;
                activo: boolean;
            };
        };
    }>;
    me(id: number): Promise<{
        statusCode: number;
        message: string;
        data: {
            id: number;
            roleId: number;
            role: string;
            clientId: number | null;
            nombre: string;
            apellido: string;
            dni: string;
            email: string;
            telefono: string | null;
            activo: boolean;
        };
    }>;
}
