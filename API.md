# Loteo Balcarce Norte — API

Base URL: `/api/v1`

Swagger: `/api/v1/docs`

Health: `GET /api/v1/health`

## Convenciones de respuesta

```json
{
  "statusCode": 200,
  "message": "Mensaje descriptivo",
  "data": {}
}
```

Las excepciones se normalizan con el filtro global. La validación rechaza campos no declarados y transforma los valores de entrada.

## Rutas principales

| Método                   | Ruta                                     | Acceso                                    |
| ------------------------ | ---------------------------------------- | ----------------------------------------- |
| `POST`                   | `/auth/login`                            | Público                                   |
| `GET`                    | `/auth/me`                               | Autenticado                               |
| `GET`, `POST`            | `/usuarios`                              | Según rol                                 |
| `GET`, `POST`            | `/ventas`                                | Según rol                                 |
| `GET`, `PATCH`, `DELETE` | `/ventas/:id`                            | Según rol y dueño                         |
| `GET`                    | `/cobranzas/deudores`                    | Administración o cobranzas                |
| `GET`                    | `/cobranzas/comprador/:id`               | Administración, cobranzas o ese comprador |
| `GET`, `POST`            | `/pagos`                                 | Según rol y dueño                         |
| `GET`                    | `/reportes/ventas`, `/reportes/deudores` | Según rol                                 |
| `GET`                    | `/dashboard`                             | Según rol                                 |
| `GET`                    | `/cotizacion/dolar`                      | Autenticado                               |
| `POST`                   | `/uploads`                               | Autenticado                               |

El Swagger generado en `/api/v1/docs` contiene el detalle vigente de los DTO y de las operaciones de cada recurso.

## Crear una venta

`compradorId` debe ser el ID de un usuario existente. `vendedorId` es opcional y, si se omite, se asigna al usuario autenticado. `garante1` acepta un objeto JSON o `null`. `planPagoId` también puede omitirse.

```json
{
  "compradorId": 12,
  "loteId": 4,
  "fechaVenta": "2026-10-03",
  "precioLista": 18000000,
  "precioFinal": 17500000,
  "garante1": {
    "nombre": "Ana",
    "apellido": "Gómez",
    "dni": "30123456"
  }
}
```

Las ventas y pagos de un usuario con rol `CLIENTE` se filtran por `comprador_id = usuarios.id`; `client_id` no se utiliza para autorizar acceso.

## Seguridad

Los endpoints privados requieren `Authorization: Bearer <token>`. Los roles principales son:

- `ADMINISTRADOR`: administración completa.
- `VENTA`: operaciones de ventas.
- `COBRANZA`: cobranzas y pagos.
- `CLIENTE`: acceso a sus propias ventas y pagos.

## Base de datos

`sql/01_schema.sql` define el esquema nuevo para una base vacía. No ejecutar ese archivo como si fuera una migración sobre una base con datos; consultar `MIGRATION.md`. No habilitar `synchronize` en desarrollo compartido ni en producción.

No hay rutas CRUD para clientes, personas o codeudores. El garante se administra dentro de la venta como JSON.
