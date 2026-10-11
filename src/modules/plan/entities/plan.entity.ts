import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("planes_pago")
export class PlanPago {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 150, unique: true })
  nombre!: string;

  @Column({ name: "cantidad_cuotas", type: "int", default: 0 })
  cantidadCuotas!: number;

  @Column({ type: "decimal", precision: 8, scale: 2, default: 0 })
  interes!: number;

  @Column({ default: false })
  personalizado!: boolean;

  @CreateDateColumn({ name: "created_at", type: "datetime", precision: 6 })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "datetime", precision: 6 })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "datetime", precision: 6 })
  deletedAt?: Date;
}
