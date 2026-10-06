import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LoteServicio } from "../../lote-servicio/entities/lote-servicio.entity.js";

@Entity("servicios")
export class Servicio {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ type: "varchar", length: 120, unique: true }) nombre!: string;
  @Column({ type: "boolean", default: true })
  activo!: boolean;

  @OneToMany(() => LoteServicio, (loteServicio) => loteServicio.servicio)
  lotes!: LoteServicio[];
}
