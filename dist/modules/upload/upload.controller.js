var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { BadRequestException, Controller, Post, UploadedFile, UseGuards, UseInterceptors, } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiConsumes, ApiBody, ApiOperation, ApiResponse, ApiTags, } from "@nestjs/swagger";
import { diskStorage } from "multer";
import { extname } from "path";
import { mkdirSync } from "fs";
import { AuthGuard } from "../../common/guards/auth.guard.js";
mkdirSync("uploads", { recursive: true });
let UploadController = class UploadController {
    upload(file) {
        if (!file)
            throw new BadRequestException("Debe adjuntar un archivo");
        return {
            statusCode: 201,
            message: "Archivo subido correctamente",
            data: { url: `/api/uploads/${file.filename}`, filename: file.filename },
        };
    }
};
__decorate([
    Post(),
    UseInterceptors(FileInterceptor("file", {
        storage: diskStorage({
            destination: "./uploads",
            filename: (_req, file, cb) => cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`),
        }),
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (_req, file, cb) => {
            const allowed = ["image/jpeg", "image/png", "application/pdf"];
            if (!allowed.includes(file.mimetype))
                return cb(new BadRequestException("Tipo de archivo no permitido"), false);
            cb(null, true);
        },
    })),
    ApiConsumes("multipart/form-data"),
    ApiBody({
        schema: {
            type: "object",
            properties: { file: { type: "string", format: "binary" } },
        },
    }),
    ApiOperation({ summary: "Subir comprobante" }),
    ApiResponse({ status: 201 }),
    __param(0, UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "upload", null);
UploadController = __decorate([
    ApiTags("Archivos"),
    ApiBearerAuth(),
    UseGuards(AuthGuard),
    Controller("uploads")
], UploadController);
export { UploadController };
//# sourceMappingURL=upload.controller.js.map