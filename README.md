# Loteo Balcarce Norte — Backend

API NestJS + TypeORM para MySQL. El modelo usa usuarios para comprador y vendedor; el garante de una venta se guarda en `ventas.garante1` como JSON.

## Configuración local

1. Copiar `artifacts/api-server/.env.example` a `artifacts/api-server/.env`.
2. Configurar la conexión MySQL y un `JWT_SECRET` aleatorio y largo.
3. Crear la estructura de una base nueva con `sql/01_schema.sql`.
4. Cargar los catálogos iniciales con `sql/02_seed.sql`.
5. Iniciar el servicio desde la raíz del workspace:

```bash
pnpm --filter @workspace/api-server run dev
```

API: `/api/v1`  
Swagger: `/api/v1/docs`  
Estado: `/api/v1/health`

Las tablas de la aplicación no se sincronizan automáticamente: `synchronize` está desactivado. El script de usuarios también respeta el esquema y no intenta crearlo.

## Datos iniciales de desarrollo

`pnpm --filter @workspace/api-server run seed` crea las cuentas de ejemplo para los roles `ADMINISTRADOR`, `COBRANZA`, `VENTA` y `CLIENTE`. Las contraseñas están definidas en `src/seed.ts`; ejecutar este seed únicamente en desarrollo y reemplazar esas credenciales antes de cualquier uso real.

## Modelo y compatibilidad

- Las ventas guardan `comprador_id` y `vendedor_id`, ambos referencias a `usuarios.id`.
- `garante1` es JSON, no una relación con una persona ni con una tabla de codeudores.
- `usuarios.client_id` se conserva como valor escalar legado, sin FK y sin uso para autorizar ventas o pagos.
- `plan_pago_id` es nullable para que eliminar un plan pueda aplicar `ON DELETE SET NULL`.
- Las tablas y módulos de clientes, personas y codeudores ya no forman parte del modelo de la API.

Para convertir una base existente, seguir primero las precauciones de `MIGRATION.md`; el SQL de esquema es para instalaciones nuevas y no migra datos existentes.
