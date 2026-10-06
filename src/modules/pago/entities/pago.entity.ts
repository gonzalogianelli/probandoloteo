import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { Venta } from "../../venta/entities/venta.entity.js";
import type { User } from "../../usuario/entities/user.entity.js";
import type { PagoCuota } from "../../pago-cuota/entities/pago-cuota.entity.js";
import type { PagoMedio } from "../../pago-medio/entities/pago-medio.entity.js";

export enum Moneda {
  ARS = "ARS",
  USD = "USD",
}

@Entity("pagos")
export class Pago {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "venta_id", type: "int" })
  ventaId!: number;

  @ManyToOne("Venta", {
    eager: true,
    nullable: false,
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "venta_id" })
  venta!: Venta;

  @Column({ name: "usuario_id", type: "int", nullable: true })
  usuarioId!: number | null;

  @ManyToOne("User", {
    eager: true,
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "usuario_id" })
  usuario!: User | null;

  @Column({ name: "fecha_pago", type: "date" })
  fechaPago!: string;

  @Column({ name: "importe_total", type: "decimal", precision: 16, scale: 2 })
  importeTotal!: number;

  @Column({ type: "enum", enum: Moneda, default: Moneda.ARS })
  moneda!: Moneda;

  @Column({
    name: "cotizacion_dolar",
    type: "decimal",
    precision: 16,
    scale: 4,
    nullable: true,
  })
  cotizacionDolar!: number | null;

  @Column({ type: "text", nullable: true })
  observaciones!: string | null;

  @Column({
    name: "comprobante_url",
    type: "varchar",
    length: 500,
    nullable: true,
  })
  comprobanteUrl!: string | null;

  @CreateDateColumn({ name: "created_at", type: "datetime", precision: 6 })
  createdAt!: Date;

  @OneToMany("PagoMedio", "pago", { cascade: true })
  mediosPago?: PagoMedio[];

  @OneToMany("PagoCuota", "pago", { cascade: true })
  pagosCuotas?: PagoCuota[];
}
