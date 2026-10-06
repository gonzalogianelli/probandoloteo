import { Moneda } from "../entities/pago.entity.js";
declare class MedioPagoDto {
    medioPagoId: number;
    importe: number;
    referencia?: string | null;
}
export declare class CreatePagoDto {
    ventaId: number;
    fechaPago: string;
    importeTotal: number;
    moneda?: Moneda;
    cotizacionDolar?: number | null;
    observaciones?: string | null;
    comprobanteUrl?: string | null;
    cuotaIds?: number[];
    tipoPago?: string;
    mediosPago?: MedioPagoDto[];
}
export {};
