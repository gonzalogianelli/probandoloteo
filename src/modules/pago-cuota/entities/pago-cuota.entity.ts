import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { Pago } from "../../pago/entities/pago.entity.js";
import { Cuota } from "../../cuota/entities/cuota.entity.js";

@Entity("pago_cuotas")
@Unique("uq_pago_cuota", ["pagoId", "cuotaId"])
export class PagoCuota {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ name: "pago_id", type: "int" }) pagoId!: number;
  @ManyToOne(() => Pago, { onDelete: "CASCADE" })
  @JoinColumn({ name: "pago_id" })
  pago!: Pago;
  @Column({ name: "cuota_id", type: "int" }) cuotaId!: number;
  @ManyToOne(() => Cuota, { eager: true, onDelete: "RESTRICT" })
  @JoinColumn({ name: "cuota_id" })
  cuota!: Cuota;
  @Column({
    name: "importe_aplicado",
    type: "decimal",
    precision: 16,
    scale: 2,
  })
  importeAplicado!: number;
  @CreateDateColumn({ name: "fecha_creacion", type: "timestamp" })
  createdAt!: Date;
  @UpdateDateColumn({ name: "fecha_actualizacion", type: "timestamp" })
  updatedAt!: Date;
  @DeleteDateColumn({ name: "fecha_eliminacion", type: "timestamp" })
  deletedAt?: Date;
}
