USE loteo_balcarce_norte;
INSERT INTO roles(nombre,descripcion) VALUES ('ADMIN','Acceso completo'),('COBRANZA','Gestión de cobranzas'),('VENTA','Gestión de ventas'),('CLIENTE','Acceso al perfil propio') ON DUPLICATE KEY UPDATE descripcion=VALUES(descripcion);
INSERT INTO servicios(nombre) VALUES ('Red eléctrica'),('Gas Natural'),('Cloacas'),('Agua Corriente') ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);
INSERT INTO planes_pago(nombre,cantidad_cuotas,interes,personalizado) VALUES ('Todo en cuotas',36,0,0),('Entrega 20% + cuotas',36,0,0),('Cuotas + cancelacion',36,0,0),('48 cuotas',48,0,0),('Contado',0,0,0) ON DUPLICATE KEY UPDATE cantidad_cuotas=VALUES(cantidad_cuotas);
INSERT INTO medios_pago(nombre) VALUES ('Transferencia bancaria'),('Efectivo'),('Mercado Pago'),('Débito automático'),('Otros') ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);
INSERT INTO loteos(nombre,descripcion,ubicacion) VALUES ('Balcarce Norte','Loteo Balcarce Norte','Balcarce, Buenos Aires') ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);
SET @loteo_id=(SELECT id FROM loteos WHERE nombre='Balcarce Norte');
INSERT INTO manzanas(loteo_id,nombre,circunscripcion,seccion,quinta,parcela,calle_par_1,calle_par_2,calle_impar_1,calle_impar_2) VALUES
(@loteo_id,'Manzana A','F','A','10','1','Calle 10','Calle 12','Calle 07','Calle 09'),
(@loteo_id,'Manzana B','G','B','11','2','Calle 14','Calle 16','Calle 11','Calle 13'),
(@loteo_id,'Manzana C','H','C','12','3','Calle 18','Calle 20','Calle 15','Calle 17') ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);
SET @a=(SELECT id FROM manzanas WHERE loteo_id=@loteo_id AND nombre='Manzana A');
SET @b=(SELECT id FROM manzanas WHERE loteo_id=@loteo_id AND nombre='Manzana B');
SET @c=(SELECT id FROM manzanas WHERE loteo_id=@loteo_id AND nombre='Manzana C');
INSERT INTO lotes(manzana_id,codigo,largo,ancho,superficie,precio,estado,direccion,entre_calle_1,entre_calle_2) VALUES
(@a,'A-01',30,12,360,18000000,'LIBRE','Av. San Martín','Calle 10','Calle 12'),
(@a,'A-02',30,12,360,18000000,'LIBRE','Av. San Martín','Calle 10','Calle 12'),
(@b,'B-14',30,14,420,21500000,'RESERVADO','Av. Independencia','Calle 14','Calle 16'),
(@c,'C-08',25,12,300,15500000,'LIBRE','Av. Libertad','Calle 18','Calle 20') ON DUPLICATE KEY UPDATE precio=VALUES(precio);
