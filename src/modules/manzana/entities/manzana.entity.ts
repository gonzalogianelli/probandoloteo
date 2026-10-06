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
import { Loteo } from "../../loteo/entities/loteo.entity.js";

@Entity("manzanas")
@Unique("uq_manzana_loteo_nombre", ["loteoId", "nombre"])
export class Manzana {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "loteo_id", type: "int" })
  loteoId!: number;

  @ManyToOne(() => Loteo, {
    eager: true,
    nullable: false,
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "loteo_id" })
  loteo!: Loteo;

  @Column({ type: "varchar", length: 100 })
  nombre!: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  circunscripcion!: string | null;

  @Column({ type: "varchar", length: 50, nullable: true })
  seccion!: string | null;

  @Column({ type: "varchar", length: 50, nullable: true })
  quinta!: string | null;

  @Column({ type: "varchar", length: 50, nullable: true })
  parcela!: string | null;

  @Column({ name: "calle_par_1", type: "varchar", length: 150, nullable: true })
  callePar1!: string | null;

  @Column({ name: "calle_par_2", type: "varchar", length: 150, nullable: true })
  callePar2!: string | null;

  @Column({
    name: "calle_impar_1",
    type: "varchar",
    length: 150,
    nullable: true,
  })
  calleImpar1!: string | null;

  @Column({
    name: "calle_impar_2",
    type: "varchar",
    length: 150,
    nullable: true,
  })
  calleImpar2!: string | null;

  @CreateDateColumn({ name: "created_at", type: "datetime", precision: 6 })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "datetime", precision: 6 })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "datetime", precision: 6 })
  deletedAt?: Date;
}
