import { VentaEstado } from "../entities/venta.entity.js";
export declare class CreateVentaDto {
    compradorId: number;
    loteId: number;
    vendedorId?: number;
    planPagoId?: number | null;
    fechaVenta: string;
    fechaBoleto?: string | null;
    precioLista: number;
    bonificacionPorcentaje?: number;
    bonificacionImporte?: number;
    precioFinal: number;
    anticipo?: number;
    importeFinanciado?: number;
    cantidadCuotas?: number;
    formatoPago?: string | null;
    estado?: VentaEstado;
    fechaPrimerVencimiento?: string;
    garante1?: Record<string, unknown> | null;
}
