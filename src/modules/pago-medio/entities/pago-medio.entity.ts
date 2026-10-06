import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pago } from "../../pago/entities/pago.entity.js";
import { MedioPago } from "../../medio/entities/medio.entity.js";

@Entity("pago_medios")
export class PagoMedio {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ name: "pago_id", type: "int" }) pagoId!: number;
  @ManyToOne(() => Pago, { onDelete: "CASCADE" })
  @JoinColumn({ name: "pago_id" })
  pago!: Pago;
  @Column({ name: "medio_pago_id", type: "int" }) medioPagoId!: number;
  @ManyToOne(() => MedioPago, { eager: true, onDelete: "RESTRICT" })
  @JoinColumn({ name: "medio_pago_id" })
  medioPago!: MedioPago;
  @Column({ type: "decimal", precision: 16, scale: 2 }) importe!: number;
  @Column({ type: "varchar", length: 255, nullable: true }) referencia!:
    | string
    | null;
}
