import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ResponseDTO } from "../../common/dto/response.dto.js";
import { ensureUpdateData, resolveOrder } from "../../common/utils/crud.js";
import { LoteServicio } from "./entities/lote-servicio.entity.js";
import { Lote } from "../lote/entities/lote.entity.js";
import { Servicio } from "../servicio/entities/servicio.entity.js";
import { CreateLoteServicioDto } from "./dto/create-lote-servicio.dto.js";
import { UpdateLoteServicioDto } from "./dto/update-lote-servicio.dto.js";

@Injectable()
export class LoteServicioService {
  constructor(
    @InjectRepository(LoteServicio)
    private readonly repository: Repository<LoteServicio>,
    @InjectRepository(Lote)
    private readonly lotes: Repository<Lote>,
    @InjectRepository(Servicio)
    private readonly servicios: Repository<Servicio>,
  ) {}

  async findAll(
    skip = 0,
    limit = 10,
    orderby?: string,
  ): Promise<ResponseDTO<LoteServicio[]>> {
    const order = resolveOrder(this.repository, orderby);
    const data = await this.repository.find({
      skip,
      take: limit,
      relations: ["lote", "servicio"],
      ...(order ? { order } : {}),
    });
    return {
      statusCode: HttpStatus.OK,
      message: "Relaciones lote-servicio obtenidas correctamente",
      data,
    };
  }

  async getById(
    loteId: number,
    servicioId: number,
  ): Promise<ResponseDTO<LoteServicio>> {
    const data = await this.repository.findOne({
      where: { loteId, servicioId },
      relations: ["lote", "servicio"],
    });
    if (!data)
      throw new NotFoundException("Relación lote-servicio no encontrada");
    return {
      statusCode: HttpStatus.OK,
      message: "Relación lote-servicio obtenida correctamente",
      data,
    };
  }

  async create(dto: CreateLoteServicioDto): Promise<ResponseDTO<LoteServicio>> {
    if (!(await this.lotes.existsBy({ id: dto.loteId })))
      throw new BadRequestException("El lote indicado no existe");
    if (!(await this.servicios.existsBy({ id: dto.servicioId })))
      throw new BadRequestException("El servicio indicado no existe");

    const exists = await this.repository.findOneBy({
      loteId: dto.loteId,
      servicioId: dto.servicioId,
    });
    if (exists)
      throw new BadRequestException("El servicio ya está asociado al lote");

    try {
      const entity = this.repository.create({
        loteId: dto.loteId,
        servicioId: dto.servicioId,
      });
      await this.repository.save(entity);
      return this.getById(dto.loteId, dto.servicioId);
    } catch (error: any) {
      if (error?.code === "ER_DUP_ENTRY")
        throw new BadRequestException("El servicio ya está asociado al lote");
      throw new InternalServerErrorException(
        "Error interno al crear la relación lote-servicio",
      );
    }
  }

  async update(
    loteId: number,
    servicioId: number,
    dto: UpdateLoteServicioDto,
  ): Promise<ResponseDTO<LoteServicio>> {
    ensureUpdateData(dto);
    const current = await this.repository.findOneBy({ loteId, servicioId });
    if (!current)
      throw new NotFoundException("Relación lote-servicio no encontrada");

    const newLoteId = dto.loteId ?? loteId;
    const newServicioId = dto.servicioId ?? servicioId;

    if (!(await this.lotes.existsBy({ id: newLoteId })))
      throw new BadRequestException("El lote indicado no existe");
    if (!(await this.servicios.existsBy({ id: newServicioId })))
      throw new BadRequestException("El servicio indicado no existe");

    if (newLoteId !== loteId || newServicioId !== servicioId) {
      const duplicate = await this.repository.findOneBy({
        loteId: newLoteId,
        servicioId: newServicioId,
      });
      if (duplicate)
        throw new BadRequestException("El servicio ya está asociado al lote");
    }

    try {
      await this.repository.manager.transaction(async (manager) => {
        await manager
          .getRepository(LoteServicio)
          .delete({ loteId, servicioId });
        await manager.getRepository(LoteServicio).save(
          manager.getRepository(LoteServicio).create({
            loteId: newLoteId,
            servicioId: newServicioId,
          }),
        );
      });
      return this.getById(newLoteId, newServicioId);
    } catch (error: any) {
      if (error?.code === "ER_DUP_ENTRY")
        throw new BadRequestException("El servicio ya está asociado al lote");
      throw new InternalServerErrorException(
        "Error interno al actualizar la relación lote-servicio",
      );
    }
  }

  async remove(loteId: number, servicioId: number): Promise<ResponseDTO> {
    const current = await this.repository.findOneBy({ loteId, servicioId });
    if (!current)
      throw new NotFoundException("Relación lote-servicio no encontrada");

    try {
      await this.repository.softRemove({ loteId, servicioId });
      return {
        statusCode: HttpStatus.OK,
        message: "Relación lote-servicio eliminada correctamente",
      };
    } catch {
      throw new InternalServerErrorException(
        "Error interno al eliminar la relación lote-servicio",
      );
    }
  }
}
