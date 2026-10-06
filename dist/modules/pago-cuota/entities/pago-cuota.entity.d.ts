import { Pago } from "../../pago/entities/pago.entity.js";
import { Cuota } from "../../cuota/entities/cuota.entity.js";
export declare class PagoCuota {
    id: number;
    pagoId: number;
    pago: Pago;
    cuotaId: number;
    cuota: Cuota;
    importeAplicado: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
