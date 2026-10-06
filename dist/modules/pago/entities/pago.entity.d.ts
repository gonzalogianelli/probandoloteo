import type { Venta } from "../../venta/entities/venta.entity.js";
import type { User } from "../../usuario/entities/user.entity.js";
import type { PagoCuota } from "../../pago-cuota/entities/pago-cuota.entity.js";
import type { PagoMedio } from "../../pago-medio/entities/pago-medio.entity.js";
export declare enum Moneda {
    ARS = "ARS",
    USD = "USD"
}
export declare class Pago {
    id: number;
    ventaId: number;
    venta: Venta;
    usuarioId: number | null;
    usuario: User | null;
    fechaPago: string;
    importeTotal: number;
    moneda: Moneda;
    cotizacionDolar: number | null;
    observaciones: string | null;
    comprobanteUrl: string | null;
    createdAt: Date;
    mediosPago?: PagoMedio[];
    pagosCuotas?: PagoCuota[];
}
