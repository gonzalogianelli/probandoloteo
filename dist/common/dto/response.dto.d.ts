export interface ResponseDTO<T = unknown> {
    statusCode: number;
    message: string;
    data?: T;
}
