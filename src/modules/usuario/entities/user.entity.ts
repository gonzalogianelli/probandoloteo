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
import { Role } from "../../rol/entities/rol.entity.js";

@Entity("usuarios")
export class User {
  @PrimaryGeneratedColumn() id!: number;

  @Column({ name: "role_id", type: "int" }) roleId!: number;
  @ManyToOne(() => Role, { eager: true, nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "role_id" })
  role!: Role;

  @Column({ name: "client_id", type: "int", nullable: true }) clientId!:
    | number
    | null;

  @Column({ type: "varchar", length: 120 }) nombre!: string;
  @Column({ type: "varchar", length: 120 }) apellido!: string;
  @Column({ type: "varchar", length: 20, unique: true }) dni!: string;
  @Column({ type: "varchar", length: 180, unique: true }) email!: string;
  @Column({ type: "varchar", length: 50, nullable: true }) telefono!:
    | string
    | null;
  @Column({
    name: "password_hash",
    type: "varchar",
    length: 255,
    select: false,
  })
  passwordHash!: string;

  @CreateDateColumn({ name: "created_at", type: "datetime", precision: 6 })
  createdAt!: Date;
  @UpdateDateColumn({ name: "updated_at", type: "datetime", precision: 6 })
  updatedAt!: Date;
  @DeleteDateColumn({ name: "deleted_at", type: "datetime", precision: 6 })
  deletedAt?: Date;
}
