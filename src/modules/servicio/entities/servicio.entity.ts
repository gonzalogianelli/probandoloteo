import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { LoteServicio } from "../../lote-servicio/entities/lote-servicio.entity.js";

@Entity("servicios")
export class Servicio {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 120, unique: true })
  nombre!: string;

  @CreateDateColumn({ name: "created_at", type: "datetime", precision: 6 })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "datetime", precision: 6 })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "datetime", precision: 6 })
  deletedAt?: Date;

  @OneToMany(() => LoteServicio, (loteServicio) => loteServicio.servicio)
  lotes!: LoteServicio[];
}
