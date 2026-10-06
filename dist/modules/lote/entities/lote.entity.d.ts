import type { Manzana } from "../../manzana/entities/manzana.entity.js";
import type { LoteServicio } from "../../lote-servicio/entities/lote-servicio.entity.js";
export declare enum LoteEstado {
    LIBRE = "LIBRE",
    RESERVADO = "RESERVADO",
    VENDIDO = "VENDIDO"
}
export declare class Lote {
    id: number;
    manzanaId: number;
    manzana: Manzana;
    codigo: string;
    largo: number;
    ancho: number;
    superficie: number;
    precio: number;
    estado: LoteEstado;
    direccion: string | null;
    entreCalle1: string | null;
    entreCalle2: string | null;
    servicios: LoteServicio[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
