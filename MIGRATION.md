# Migración desde el esquema anterior

`sql/01_schema.sql` crea las tablas del modelo nuevo en una base vacía. Sus `CREATE TABLE IF NOT EXISTS` no convierten una instalación anterior ni copian datos.

## Antes de migrar una base existente

1. Hacer y verificar una copia de seguridad completa.
2. Detener escrituras de la API durante la conversión.
3. Confirmar que cada venta se puede asociar a un usuario comprador y a un usuario vendedor.
4. Definir cómo convertir los antiguos registros de codeudores y `titular2_persona_id` en el único objeto `garante1`.
5. Probar los cambios en una copia de la base y comparar conteos, importes, pagos y saldos antes de producción.

## Mapeo que requiere revisión

- `ventas.cliente_id` apuntaba a `clientes.id`; el nuevo `ventas.comprador_id` apunta a `usuarios.id`. No copiar el valor numérico sin una tabla de correspondencia. Crear o identificar cada cuenta de usuario comprador y usar su ID real.
- El antiguo `ventas.usuario_id` puede servir como `vendedor_id` solo si identifica al usuario que efectivamente realizó la venta. Las ventas sin vendedor válido necesitan una asignación manual antes de aplicar la restricción `NOT NULL`.
- Los registros de `venta_codeudores` y `titular2_persona_id` no tienen una conversión única automática a `garante1`. Revisar los datos y construir el JSON que corresponda en cada venta.
- `usuarios.client_id` permanece como un valor legado escalar, pero deja de tener FK y no participa en la autorización. No usarlo como comprador.
- `plan_pago_id` queda nullable porque la FK usa `ON DELETE SET NULL`; comprador y vendedor se mantienen obligatorios con `ON DELETE RESTRICT`.

No se eliminan tablas ni datos antiguos automáticamente. Después de validar la conversión y confirmar que no quedan consumidores de `clientes`, `personas` o `venta_codeudores`, esas tablas antiguas se pueden retirar en una migración independiente y aprobada.
