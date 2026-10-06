import { CuotaEstado } from "../entities/cuota.entity.js";
export declare class CreateCuotaDto {
    ventaId: number;
    numero: number;
    fechaVencimiento: string;
    importe: number;
    saldo: number;
    estado: CuotaEstado;
}
