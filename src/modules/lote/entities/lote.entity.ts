import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import type { Manzana } from "../../manzana/entities/manzana.entity.js";
import type { LoteServicio } from "../../lote-servicio/entities/lote-servicio.entity.js";

export enum LoteEstado {
  LIBRE = "LIBRE",
  RESERVADO = "RESERVADO",
  VENDIDO = "VENDIDO",
}

@Entity("lotes")
@Unique("uq_lote_manzana_nombre", ["manzanaId", "nombre"])
export class Lote {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "manzana_id", type: "int" })
  manzanaId!: number;

  @ManyToOne("Manzana", "lotes", {
    eager: true,
    nullable: false,
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "manzana_id" })
  manzana!: Manzana;

  @Column({ type: "varchar", length: 100 })
  nombre!: string;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  largo!: number;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  ancho!: number;

  @Column({ type: "decimal", precision: 14, scale: 2, default: 0 })
  superficie!: number;

  @Column({ type: "decimal", precision: 16, scale: 2, default: 0 })
  precio!: number;

  @Column({ type: "enum", enum: LoteEstado, default: LoteEstado.LIBRE })
  estado!: LoteEstado;

  @Column({ name: "calle_1", type: "varchar", length: 180, nullable: true })
  calle1!: string | null;

  @Column({ name: "calle_2", type: "varchar", length: 180, nullable: true })
  calle2!: string | null;

  @Column({ name: "calle_3", type: "varchar", length: 180, nullable: true })
  calle3!: string | null;

  @OneToMany("LoteServicio", "lote")
  servicios!: LoteServicio[];

  @CreateDateColumn({ name: "created_at", type: "datetime", precision: 6 })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "datetime", precision: 6 })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "datetime", precision: 6 })
  deletedAt?: Date;
  direccion: string | null;
  entreCalle1: string | null;
}
