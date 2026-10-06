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
import { Venta } from "../../venta/entities/venta.entity.js";

export enum CuotaEstado {
  PENDIENTE = "PENDIENTE",
  PAGADA = "PAGADA",
  PARCIAL = "PARCIAL",
  VENCIDA = "VENCIDA",
}

@Entity("cuotas")
@Unique("uq_cuota_venta_numero", ["ventaId", "numero"])
export class Cuota {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ name: "venta_id", type: "int" }) ventaId!: number;
  @ManyToOne(() => Venta, { onDelete: "CASCADE" })
  @JoinColumn({ name: "venta_id" })
  venta!: Venta;
  @Column({ type: "int" }) numero!: number;
  @Column({ name: "fecha_vencimiento", type: "date" })
  fechaVencimiento!: string;
  @Column({ type: "decimal", precision: 16, scale: 2 }) importe!: number;
  @Column({ type: "decimal", precision: 16, scale: 2 }) saldo!: number;
  @Column({ type: "enum", enum: CuotaEstado, default: CuotaEstado.PENDIENTE })
  estado!: CuotaEstado;
  @CreateDateColumn({ name: "created_at", type: "datetime", precision: 6 })
  createdAt!: Date;
  @UpdateDateColumn({ name: "updated_at", type: "datetime", precision: 6 })
  updatedAt!: Date;
  @DeleteDateColumn({ name: "deleted_at", type: "datetime", precision: 6 })
  deletedAt?: Date;
}
