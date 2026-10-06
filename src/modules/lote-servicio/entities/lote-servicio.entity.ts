import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import type { Lote } from "../../lote/entities/lote.entity.js";
import type { Servicio } from "../../servicio/entities/servicio.entity.js";

@Entity("lote_servicios")
export class LoteServicio {
  @PrimaryColumn({ name: "lote_id", type: "int" })
  loteId!: number;

  @ManyToOne("Lote", "servicios", {
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn({ name: "lote_id" })
  lote!: Lote;

  @PrimaryColumn({ name: "servicio_id", type: "int" })
  servicioId!: number;

  @ManyToOne("Servicio", "loteServicios", {
    onDelete: "RESTRICT",
    nullable: false,
  })
  @JoinColumn({ name: "servicio_id" })
  servicio!: Servicio;
}
