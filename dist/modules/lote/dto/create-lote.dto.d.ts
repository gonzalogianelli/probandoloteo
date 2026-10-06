import { LoteEstado } from "../entities/lote.entity.js";
export declare class CreateLoteDto {
    manzanaId: number;
    codigo: string;
    largo: number;
    ancho: number;
    precio: number;
    estado?: LoteEstado;
    direccion?: string | null;
    entreCalle1?: string | null;
    entreCalle2?: string | null;
    serviciosIds?: number[];
}
