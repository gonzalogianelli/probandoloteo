import { Lote } from "../../lote/entities/lote.entity.js";
import { PlanPago } from "../../plan/entities/plan.entity.js";
import { User } from "../../usuario/entities/user.entity.js";
export declare enum VentaEstado {
    ACTIVA = "ACTIVA",
    CANCELADA = "CANCELADA",
    FINALIZADA = "FINALIZADA"
}
export declare class Venta {
    id: number;
    compradorId: number;
    comprador: User;
    loteId: number;
    lote: Lote;
    vendedorId: number;
    vendedor: User;
    planPagoId: number | null;
    planPago: PlanPago | null;
    fechaVenta: string;
    fechaBoleto: string | null;
    precioLista: number;
    bonificacionPorcentaje: number;
    bonificacionImporte: number;
    precioFinal: number;
    anticipo: number;
    importeFinanciado: number;
    cantidadCuotas: number;
    formatoPago: string | null;
    garante1: Record<string, unknown> | null;
    estado: VentaEstado;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
