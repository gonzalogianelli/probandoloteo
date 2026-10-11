import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("loteos")
export class Loteo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 150, unique: true })
  nombre!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  descripcion!: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  ubicacion!: string | null;

  @CreateDateColumn({ name: "created_at", type: "datetime", precision: 6 })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "datetime", precision: 6 })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "datetime", precision: 6 })
  deletedAt?: Date;
}
