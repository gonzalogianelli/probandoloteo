import { User } from "../../modules/usuario/entities/user.entity.js";
export declare function publicUser(user: User): {
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
