import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("medios_pago")
export class MedioPago {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ type: "varchar", length: 120, unique: true }) nombre!: string;
  @Column({ default: true }) activo!: boolean;
}
