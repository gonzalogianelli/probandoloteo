import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import {
  BadRequestException,
  HttpStatus,
  ValidationPipe,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import express from "express";
import { AppModule } from "./app.module.js";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.setGlobalPrefix("api/v1");

  app.enableCors({
    origin: config
      .get("CORS_ORIGIN", "http://localhost:5173")
      .split(",")
      .map((x: string) => x.trim()),
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const messages: string[] = [];
        for (const e of errors)
          if (e.constraints) messages.push(...Object.values(e.constraints));
        return new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: messages.join(". ") || "Datos de entrada inválidos",
        });
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app
    .getHttpAdapter()
    .getInstance()
    .use("/api/v1/uploads", express.static("uploads"));
  const options = new DocumentBuilder()
    .setTitle("Loteo Balcarce Norte API")
    .setDescription(
      "API para administrar loteos, usuarios, ventas, cuotas y cobranzas.",
    )
    .setVersion("2.0.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api/v1/docs", app, document);

  await app.listen(Number(config.get("PORT", 3000)));
}
bootstrap();
