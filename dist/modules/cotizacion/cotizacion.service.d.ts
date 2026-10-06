export declare class CotizacionService {
    dolar(): Promise<{
        statusCode: number;
        message: string;
        data: {
            fuente: string;
            cotizaciones: ({
                tipo: string;
                compra: number;
                venta: number;
                fechaActualizacion: any;
            } | null)[];
        };
    }>;
}
