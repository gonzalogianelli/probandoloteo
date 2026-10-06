import { Repository } from "typeorm";
import { User } from "./entities/user.entity.js";
import { CreateUsuarioDto } from "./dto/create-usuario.dto.js";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto.js";
import { ResponseDTO } from "../../common/dto/response.dto.js";
import { PaginationDto } from "../../common/dto/pagination.dto.js";
import { publicUser } from "../../common/utils/user.mapper.js";
export declare class UsuarioService {
    private readonly users;
    constructor(users: Repository<User>);
    findAll(query: PaginationDto): Promise<ResponseDTO<ReturnType<typeof publicUser>[]>>;
    getById(id: number): Promise<ResponseDTO<ReturnType<typeof publicUser>>>;
    create(dto: CreateUsuarioDto): Promise<ResponseDTO<ReturnType<typeof publicUser>>>;
    update(id: number, dto: UpdateUsuarioDto): Promise<ResponseDTO<ReturnType<typeof publicUser>>>;
    remove(id: number): Promise<ResponseDTO>;
}
