export declare class UploadController {
    upload(file: Express.Multer.File): {
        statusCode: number;
        message: string;
        data: {
            url: string;
            filename: string;
        };
    };
}
