import { Pago } from "../../pago/entities/pago.entity.js";
import { MedioPago } from "../../medio/entities/medio.entity.js";
export declare class PagoMedio {
    id: number;
    pagoId: number;
    pago: Pago;
    medioPagoId: number;
    medioPago: MedioPago;
    importe: number;
    referencia: string | null;
}
