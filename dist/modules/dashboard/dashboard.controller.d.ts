import { DashboardService } from "./dashboard.service.js";
export declare class DashboardController {
    private readonly service;
    constructor(service: DashboardService);
    dashboard(): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
}
