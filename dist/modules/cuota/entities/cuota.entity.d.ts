import { Venta } from "../../venta/entities/venta.entity.js";
export declare enum CuotaEstado {
    PENDIENTE = "PENDIENTE",
    PAGADA = "PAGADA",
    PARCIAL = "PARCIAL",
    VENCIDA = "VENCIDA"
}
export declare class Cuota {
    id: number;
    ventaId: number;
    venta: Venta;
    numero: number;
    fechaVencimiento: string;
    importe: number;
    saldo: number;
    estado: CuotaEstado;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
