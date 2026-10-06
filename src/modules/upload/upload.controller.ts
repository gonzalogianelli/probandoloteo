import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { diskStorage } from "multer";
import { extname } from "path";
import { mkdirSync } from "fs";
import { AuthGuard } from "../../common/guards/auth.guard.js";
mkdirSync("uploads", { recursive: true });
@ApiTags("Archivos")
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller("uploads")
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (_req, file, cb) =>
          cb(
            null,
            `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`,
          ),
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        const allowed = ["image/jpeg", "image/png", "application/pdf"];
        if (!allowed.includes(file.mimetype))
          return cb(
            new BadRequestException("Tipo de archivo no permitido"),
            false,
          );
        cb(null, true);
      },
    }),
  )
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: { file: { type: "string", format: "binary" } },
    },
  })
  @ApiOperation({ summary: "Subir comprobante" })
  @ApiResponse({ status: 201 })
  upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException("Debe adjuntar un archivo");
    return {
      statusCode: 201,
      message: "Archivo subido correctamente",
      data: { url: `/api/uploads/${file.filename}`, filename: file.filename },
    };
  }
}
