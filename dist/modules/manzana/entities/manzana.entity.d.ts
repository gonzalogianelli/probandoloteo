import { Loteo } from "../../loteo/entities/loteo.entity.js";
export declare class Manzana {
    id: number;
    loteoId: number;
    loteo: Loteo;
    nombre: string;
    circunscripcion: string | null;
    seccion: string | null;
    quinta: string | null;
    parcela: string | null;
    callePar1: string | null;
    callePar2: string | null;
    calleImpar1: string | null;
    calleImpar2: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
