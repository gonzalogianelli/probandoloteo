import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Lote, LoteEstado } from "../lote/entities/lote.entity.js";
import { CobranzaService } from "../cobranza/cobranza.service.js";
import { ResponseDTO } from "../../common/dto/response.dto.js";
@Injectable()
export class ReporteService {
  constructor(
    @InjectRepository(Lote) private readonly lotes: Repository<Lote>,
    private readonly cobranza: CobranzaService,
  ) {}
  async reporteVentas(): Promise<ResponseDTO<any>> {
    const lots = await this.lotes.find({
      relations: ["manzana", "manzana.loteo"],
    });
    const data = {
      totales: {
        libres: lots.filter((x) => x.estado === LoteEstado.LIBRE).length,
        reservados: lots.filter((x) => x.estado === LoteEstado.RESERVADO)
          .length,
        vendidos: lots.filter((x) => x.estado === LoteEstado.VENDIDO).length,
        total: lots.length,
      },
      porManzana: Object.values(
        lots.reduce((a: any, l) => {
          const k = l.manzana?.nombre ?? "?";
          a[k] ??= { manzana: k, libres: 0, reservados: 0, vendidos: 0 };
          a[k][
            l.estado === LoteEstado.LIBRE
              ? "libres"
              : l.estado === LoteEstado.RESERVADO
                ? "reservados"
                : "vendidos"
          ]++;
          return a;
        }, {}),
      ),
    };
    return {
      statusCode: 200,
      message: "Reporte de ventas obtenido correctamente",
      data,
    };
  }
  async deudores() {
    return this.cobranza.deudores();
  }
}
