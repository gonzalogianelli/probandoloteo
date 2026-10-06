export declare class CreateUsuarioDto {
    roleId: number;
    clientId?: number | null;
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    telefono?: string | null;
    password: string;
    activo?: boolean;
}
