import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Lote } from "../../lote/entities/lote.entity.js";
import { PlanPago } from "../../plan/entities/plan.entity.js";
import { User } from "../../usuario/entities/user.entity.js";

export enum VentaEstado {
  ACTIVA = "ACTIVA",
  CANCELADA = "CANCELADA",
  FINALIZADA = "FINALIZADA",
}

@Entity("ventas")
export class Venta {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ name: "comprador_id", type: "int" }) compradorId!: number;
  @ManyToOne(() => User, { eager: true, nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "comprador_id" })
  comprador!: User;

  @Column({ name: "lote_id", type: "int" }) loteId!: number;
  @ManyToOne(() => Lote, { eager: true, nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "lote_id" })
  lote!: Lote;

  @Column({ name: "vendedor_id", type: "int" }) vendedorId!: number;
  @ManyToOne(() => User, { eager: true, nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "vendedor_id" })
  vendedor!: User;

  @Column({ name: "plan_pago_id", type: "int", nullable: true }) planPagoId!:
    | number
    | null;
  @ManyToOne(() => PlanPago, {
    eager: true,
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "plan_pago_id" })
  planPago!: PlanPago | null;

  @Column({ name: "fecha_venta", type: "date" }) fechaVenta!: string;
  @Column({ name: "fecha_boleto", type: "date", nullable: true }) fechaBoleto!:
    | string
    | null;
  @Column({ name: "precio_lista", type: "decimal", precision: 16, scale: 2 })
  precioLista!: number;
  @Column({
    name: "bonificacion_porcentaje",
    type: "decimal",
    precision: 8,
    scale: 2,
    default: 0,
  })
  bonificacionPorcentaje!: number;
  @Column({
    name: "bonificacion_importe",
    type: "decimal",
    precision: 16,
    scale: 2,
    default: 0,
  })
  bonificacionImporte!: number;
  @Column({ name: "precio_final", type: "decimal", precision: 16, scale: 2 })
  precioFinal!: number;
  @Column({
    name: "anticipo",
    type: "decimal",
    precision: 16,
    scale: 2,
    default: 0,
  })
  anticipo!: number;
  @Column({
    name: "importe_financiado",
    type: "decimal",
    precision: 16,
    scale: 2,
    default: 0,
  })
  importeFinanciado!: number;
  @Column({ name: "cantidad_cuotas", type: "int", default: 0 })
  cantidadCuotas!: number;
  @Column({ name: "formato_pago", type: "text", nullable: true }) formatoPago!:
    | string
    | null;
  @Column({ name: "garante1", type: "json", nullable: true })
  garante1!: Record<string, unknown> | null;
  @Column({ type: "enum", enum: VentaEstado, default: VentaEstado.ACTIVA })
  estado!: VentaEstado;
  @CreateDateColumn({ name: "created_at", type: "datetime", precision: 6 })
  createdAt!: Date;
  @UpdateDateColumn({ name: "updated_at", type: "datetime", precision: 6 })
  updatedAt!: Date;
  @DeleteDateColumn({ name: "deleted_at", type: "datetime", precision: 6 })
  deletedAt?: Date;
}
