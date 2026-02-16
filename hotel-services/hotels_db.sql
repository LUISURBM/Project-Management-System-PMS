CREATE DATABASE IF NOT EXISTS hotel_db;
USE hotel_db;

-- 1. Catálogo de estados de habitación
CREATE TABLE estados_habitacion (
    id_estado INT AUTO_INCREMENT PRIMARY KEY,
    nombre_estado VARCHAR(50) NOT NULL -- Ej: 'Libre', 'Ocupada', 'Limpieza', 'Mantenimiento'
);

-- 2. Tabla de Habitaciones
CREATE TABLE habitaciones (
    id_habitacion INT AUTO_INCREMENT PRIMARY KEY,
    numero VARCHAR(10) NOT NULL UNIQUE,
    tipo VARCHAR(50), -- Ej: 'Doble', 'Suite'
    precio_base DECIMAL(10, 2) NOT NULL,
    id_estado INT DEFAULT 1,
    notas_extras TEXT, -- Aquí guardas lo que piden extras para la habitación
    FOREIGN KEY (id_estado) REFERENCES estados_habitacion(id_estado)
);

-- 3. Tabla de Huéspedes
CREATE TABLE huespedes (
    id_huesped INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(150) NOT NULL,
    documento_identidad VARCHAR(20) UNIQUE,
    telefono VARCHAR(20),
    email VARCHAR(100)
);

-- 4. Tabla de Reservas (Check-in/Check-out)
CREATE TABLE reservas (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_huesped INT,
    id_habitacion INT,
    fecha_entrada DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_salida DATETIME,
    total_pagado DECIMAL(10, 2) DEFAULT 0.00,
    estado_reserva ENUM('Activa', 'Finalizada', 'Cancelada') DEFAULT 'Activa',
    FOREIGN KEY (id_huesped) REFERENCES huespedes(id_huesped),
    FOREIGN KEY (id_habitacion) REFERENCES habitaciones(id_habitacion)
);

-- 5. Control de Caja
CREATE TABLE cajas (
    id_caja INT AUTO_INCREMENT PRIMARY KEY,
    fecha_apertura DATETIME DEFAULT CURRENT_TIMESTAMP,
    monto_inicial DECIMAL(10, 2) NOT NULL,
    fecha_cierre DATETIME NULL,
    monto_final DECIMAL(10, 2) NULL,
    estado_caja ENUM('Abierta', 'Cerrada') DEFAULT 'Abierta'
);

-- 6. Registro de Movimientos (Ingresos y Gastos)
CREATE TABLE movimientos_caja (
    id_movimiento INT AUTO_INCREMENT PRIMARY KEY,
    id_caja INT,
    tipo_movimiento ENUM('Ingreso', 'Gasto') NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    descripcion TEXT,
    fecha_movimiento DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_caja) REFERENCES cajas(id_caja)
);

-- Datos iniciales para que el sistema funcione de inmediato
INSERT INTO estados_habitacion (nombre_estado) VALUES ('Libre'), ('Ocupada'), ('Limpieza'), ('Mantenimiento');

INSERT INTO habitaciones (numero, tipo, precio_base, id_estado) VALUES 
('101', 'Simple', 50.00, 1),
('102', 'Doble', 80.00, 1),
('201', 'Suite', 150.00, 1);

INSERT INTO huespedes (nombre_completo, documento_identidad, telefono, email) VALUES 
('Juan Pérez', '12345678', '+34912345678', 'juan@example.com');

INSERT INTO reservas (id_huesped, id_habitacion, fecha_entrada, fecha_salida, total_pagado, estado_reserva) VALUES 
(1, 4, '2023-04-01', '2023-04-05', 200.00, 'Finalizada'),
(1, 4, '2023-04-10', '2023-04-15', 250.00, 'Finalizada'),
(1, 4, '2023-05-01', '2023-05-07', 300.00, 'Activa'),
(1, 4, '2023-05-20', '2023-05-25', 200.00, 'Activa'),
(1, 4, '2023-06-01', '2023-06-10', 450.00, 'Cancelada');
