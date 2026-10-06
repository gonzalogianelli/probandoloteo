import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 50, unique: true })
  nombre!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  descripcion!: string | null;
}
