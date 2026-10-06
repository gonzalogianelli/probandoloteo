CREATE DATABASE IF NOT EXISTS loteo_balcarce_norte
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE loteo_balcarce_norte;

CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE,
  descripcion VARCHAR(255) NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS loteos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL UNIQUE,
  descripcion VARCHAR(255) NULL,
  ubicacion VARCHAR(255) NULL,
  activo TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
    ON UPDATE CURRENT_TIMESTAMP(6),
  deleted_at DATETIME(6) NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS manzanas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  loteo_id INT NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  circunscripcion VARCHAR(50) NULL,
  seccion VARCHAR(50) NULL,
  quinta VARCHAR(50) NULL,
  parcela VARCHAR(50) NULL,
  calle_par_1 VARCHAR(150) NULL,
  calle_par_2 VARCHAR(150) NULL,
  calle_impar_1 VARCHAR(150) NULL,
  calle_impar_2 VARCHAR(150) NULL,
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
    ON UPDATE CURRENT_TIMESTAMP(6),
  deleted_at DATETIME(6) NULL,
  UNIQUE KEY uq_manzana_loteo_nombre (loteo_id, nombre),
  CONSTRAINT fk_manzana_loteo FOREIGN KEY (loteo_id)
    REFERENCES loteos(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS servicios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL UNIQUE,
  activo TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS lotes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  manzana_id INT NOT NULL,
  codigo VARCHAR(50) NOT NULL,
  largo DECIMAL(12,2) NOT NULL DEFAULT 0,
  ancho DECIMAL(12,2) NOT NULL DEFAULT 0,
  superficie DECIMAL(14,2) NOT NULL DEFAULT 0,
  precio DECIMAL(16,2) NOT NULL DEFAULT 0,
  estado ENUM('LIBRE','RESERVADO','VENDIDO') NOT NULL DEFAULT 'LIBRE',
  direccion VARCHAR(180) NULL,
  entre_calle_1 VARCHAR(180) NULL,
  entre_calle_2 VARCHAR(180) NULL,
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
    ON UPDATE CURRENT_TIMESTAMP(6),
  deleted_at DATETIME(6) NULL,
  UNIQUE KEY uq_lote_manzana_codigo (manzana_id, codigo),
  CONSTRAINT fk_lote_manzana FOREIGN KEY (manzana_id)
    REFERENCES manzanas(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS lote_servicios (
  lote_id INT NOT NULL,
  servicio_id INT NOT NULL,
  PRIMARY KEY (lote_id, servicio_id),
  KEY ix_lote_servicios_servicio (servicio_id),
  CONSTRAINT fk_lote_servicios_lote FOREIGN KEY (lote_id)
    REFERENCES lotes(id) ON DELETE CASCADE,
  CONSTRAINT fk_lote_servicios_servicio FOREIGN KEY (servicio_id)
    REFERENCES servicios(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS planes_pago (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL UNIQUE,
  cantidad_cuotas INT NOT NULL DEFAULT 0,
  interes DECIMAL(8,2) NOT NULL DEFAULT 0,
  personalizado TINYINT(1) NOT NULL DEFAULT 0,
  activo TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role_id INT NOT NULL,
  client_id INT NULL,
  nombre VARCHAR(120) NOT NULL,
  apellido VARCHAR(120) NOT NULL,
  dni VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(180) NOT NULL UNIQUE,
  telefono VARCHAR(50) NULL,
  password_hash VARCHAR(255) NOT NULL,
  activo TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
    ON UPDATE CURRENT_TIMESTAMP(6),
  deleted_at DATETIME(6) NULL,
  KEY ix_usuarios_role (role_id),
  CONSTRAINT fk_usuarios_role FOREIGN KEY (role_id)
    REFERENCES roles(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS ventas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  vendedor_id INT NOT NULL,
  lote_id INT NOT NULL,
  comprador_id INT NOT NULL,
  garante1 JSON NULL,
  plan_pago_id INT NULL,
  fecha_venta DATE NOT NULL,
  fecha_boleto DATE NULL,
  precio_lista DECIMAL(16,2) NOT NULL,
  bonificacion_porcentaje DECIMAL(8,2) NOT NULL DEFAULT 0,
  bonificacion_importe DECIMAL(16,2) NOT NULL DEFAULT 0,
  precio_final DECIMAL(16,2) NOT NULL,
  anticipo DECIMAL(16,2) NOT NULL DEFAULT 0,
  importe_financiado DECIMAL(16,2) NOT NULL DEFAULT 0,
  cantidad_cuotas INT NOT NULL DEFAULT 0,
  formato_pago TEXT NULL,
  estado ENUM('ACTIVA','CANCELADA','FINALIZADA') NOT NULL DEFAULT 'ACTIVA',
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
    ON UPDATE CURRENT_TIMESTAMP(6),
  deleted_at DATETIME(6) NULL,
  KEY ix_ventas_vendedor (vendedor_id),
  KEY ix_ventas_lote (lote_id),
  KEY ix_ventas_comprador (comprador_id),
  KEY ix_ventas_plan_pago (plan_pago_id),
  CONSTRAINT fk_ventas_vendedor FOREIGN KEY (vendedor_id)
    REFERENCES usuarios(id) ON DELETE RESTRICT,
  CONSTRAINT fk_ventas_lote FOREIGN KEY (lote_id)
    REFERENCES lotes(id) ON DELETE RESTRICT,
  CONSTRAINT fk_ventas_comprador FOREIGN KEY (comprador_id)
    REFERENCES usuarios(id) ON DELETE RESTRICT,
  CONSTRAINT fk_ventas_plan_pago FOREIGN KEY (plan_pago_id)
    REFERENCES planes_pago(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS cuotas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  venta_id INT NOT NULL,
  numero INT NOT NULL,
  fecha_vencimiento DATE NOT NULL,
  importe DECIMAL(16,2) NOT NULL,
  saldo DECIMAL(16,2) NOT NULL,
  estado ENUM('PENDIENTE','PAGADA','PARCIAL','VENCIDA')
    NOT NULL DEFAULT 'PENDIENTE',
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
    ON UPDATE CURRENT_TIMESTAMP(6),
  deleted_at DATETIME(6) NULL,
  UNIQUE KEY uq_cuota_venta_numero (venta_id, numero),
  KEY ix_cuotas_vencimiento_estado (fecha_vencimiento, estado),
  CONSTRAINT fk_cuotas_venta FOREIGN KEY (venta_id)
    REFERENCES ventas(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS medios_pago (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL UNIQUE,
  activo TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS pagos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  venta_id INT NOT NULL,
  usuario_id INT NULL,
  fecha_pago DATE NOT NULL,
  importe_total DECIMAL(16,2) NOT NULL,
  moneda ENUM('ARS','USD') NOT NULL DEFAULT 'ARS',
  cotizacion_dolar DECIMAL(16,4) NULL,
  observaciones TEXT NULL,
  comprobante_url VARCHAR(500) NULL,
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  KEY ix_pagos_venta (venta_id),
  KEY ix_pagos_usuario (usuario_id),
  KEY ix_pagos_fecha (fecha_pago),
  CONSTRAINT fk_pagos_venta FOREIGN KEY (venta_id)
    REFERENCES ventas(id) ON DELETE RESTRICT,
  CONSTRAINT fk_pagos_usuario FOREIGN KEY (usuario_id)
    REFERENCES usuarios(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS pago_cuotas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pago_id INT NOT NULL,
  cuota_id INT NOT NULL,
  importe_aplicado DECIMAL(16,2) NOT NULL,
  fecha_creacion TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  fecha_actualizacion TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
    ON UPDATE CURRENT_TIMESTAMP(6),
  fecha_eliminacion TIMESTAMP(6) NULL,
  UNIQUE KEY uq_pago_cuota (pago_id, cuota_id),
  KEY ix_pago_cuotas_cuota (cuota_id),
  CONSTRAINT fk_pago_cuotas_pago FOREIGN KEY (pago_id)
    REFERENCES pagos(id) ON DELETE CASCADE,
  CONSTRAINT fk_pago_cuotas_cuota FOREIGN KEY (cuota_id)
    REFERENCES cuotas(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS pago_medios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pago_id INT NOT NULL,
  medio_pago_id INT NOT NULL,
  importe DECIMAL(16,2) NOT NULL,
  referencia VARCHAR(255) NULL,
  KEY ix_pago_medios_pago (pago_id),
  KEY ix_pago_medios_medio (medio_pago_id),
  CONSTRAINT fk_pago_medios_pago FOREIGN KEY (pago_id)
    REFERENCES pagos(id) ON DELETE CASCADE,
  CONSTRAINT fk_pago_medios_medio FOREIGN KEY (medio_pago_id)
    REFERENCES medios_pago(id) ON DELETE RESTRICT
) ENGINE=InnoDB;
