import { UsuarioService } from "./usuario.service.js";
import { CreateUsuarioDto } from "./dto/create-usuario.dto.js";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto.js";
import { PaginationDto } from "../../common/dto/pagination.dto.js";
export declare class UsuarioController {
    private readonly service;
    constructor(service: UsuarioService);
    findAll(q: PaginationDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<{
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
    }[]>>;
    getById(id: number): Promise<import("../../common/dto/response.dto.js").ResponseDTO<{
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
    }>>;
    create(dto: CreateUsuarioDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<{
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
    }>>;
    update(id: number, dto: UpdateUsuarioDto): Promise<import("../../common/dto/response.dto.js").ResponseDTO<{
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
    }>>;
    remove(id: number): Promise<import("../../common/dto/response.dto.js").ResponseDTO<unknown>>;
}
