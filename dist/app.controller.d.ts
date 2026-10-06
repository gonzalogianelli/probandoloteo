export declare class AppController {
    health(): {
        statusCode: number;
        message: string;
        data: {
            service: string;
            timestamp: string;
        };
    };
}
