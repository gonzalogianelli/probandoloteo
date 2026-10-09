export declare class CotizacionService {
    dolar(): Promise<{
        statusCode: number;
        message: string;
        data: {
            fuente: string;
            dolarMasAltoVenta: number;
        };
    }>;
}
