import { LoteServicio } from "../../lote-servicio/entities/lote-servicio.entity.js";
export declare class Servicio {
    id: number;
    nombre: string;
    activo: boolean;
    lotes: LoteServicio[];
}
