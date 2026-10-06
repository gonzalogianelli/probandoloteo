import { Role } from "../../rol/entities/rol.entity.js";
export declare class User {
    id: number;
    roleId: number;
    role: Role;
    clientId: number | null;
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    telefono: string | null;
    passwordHash: string;
    activo: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
