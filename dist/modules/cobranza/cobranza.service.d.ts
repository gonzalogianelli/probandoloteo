import { Repository } from "typeorm";
import { Venta } from "../venta/entities/venta.entity.js";
import { Cuota } from "../cuota/entities/cuota.entity.js";
import { Pago } from "../pago/entities/pago.entity.js";
import { User } from "../usuario/entities/user.entity.js";
import { ResponseDTO } from "../../common/dto/response.dto.js";
export declare class CobranzaService {
    private readonly ventas;
    private readonly cuotas;
    private readonly pagos;
    private readonly users;
    constructor(ventas: Repository<Venta>, cuotas: Repository<Cuota>, pagos: Repository<Pago>, users: Repository<User>);
    deudores(): Promise<ResponseDTO<any[]>>;
    cuentaComprador(id: number, user?: any): Promise<ResponseDTO<any>>;
}
