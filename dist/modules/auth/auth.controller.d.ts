import { AuthService } from "./auth.service.js";
import { LoginDto } from "./dto/login.dto.js";
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
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
    me(req: any): Promise<{
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
