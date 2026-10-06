import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { UsuarioService } from "./usuario.service.js";
import { CreateUsuarioDto } from "./dto/create-usuario.dto.js";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto.js";
import { PaginationDto } from "../../common/dto/pagination.dto.js";
import { AuthGuard } from "../../common/guards/auth.guard.js";
import { RolesGuard } from "../../common/guards/roles.guard.js";
import { Roles } from "../../common/decorators/roles.decorator.js";

@ApiTags("Usuarios")
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles("ADMIN")
@Controller("usuarios")
export class UsuarioController {
  constructor(private readonly service: UsuarioService) {}
  @Get()
  @ApiOperation({ summary: "Obtener usuarios" })
  @ApiResponse({ status: 200 })
  findAll(@Query() q: PaginationDto) {
    return this.service.findAll(q);
  }
  @Get(":id")
  @ApiOperation({ summary: "Obtener usuario por ID" })
  @ApiParam({ name: "id", type: Number })
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.service.getById(id);
  }
  @Post()
  @ApiOperation({ summary: "Crear usuario" })
  @ApiBody({ type: CreateUsuarioDto })
  @ApiResponse({ status: 201 })
  create(@Body() dto: CreateUsuarioDto) {
    return this.service.create(dto);
  }
  @Patch(":id")
  @ApiOperation({ summary: "Actualizar usuario" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateUsuarioDto })
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateUsuarioDto) {
    return this.service.update(id, dto);
  }
  @Delete(":id") @ApiOperation({ summary: "Eliminar usuario" }) remove(
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.service.remove(id);
  }
}
