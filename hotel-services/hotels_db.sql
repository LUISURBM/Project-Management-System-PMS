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
    notas VARCHAR(500) NULL,
    FOREIGN KEY (id_huesped) REFERENCES huespedes(id_huesped),
    FOREIGN KEY (id_habitacion) REFERENCES habitaciones(id_habitacion)
);

-- Add 'notas' to existing installations if missing
ALTER TABLE reservas ADD COLUMN IF NOT EXISTS notas VARCHAR(500) NULL;

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
('Juan Pérez', '12345678', '+34912345678', 'juan.perez@example.com'),
('Maria Garcia', '23456789', '+34923456789', 'maria.garcia@example.com'),
('Jose Lopez', '34567890', '+34934567890', 'jose.lopez@example.com'),
('Ana Martinez', '45678901', '+34945678901', 'ana.martinez@example.com'),
('Luis Rodriguez', '56789012', '+34956789012', 'luis.rodriguez@example.com'),
('Carmen Sanchez', '67890123', '+34967890123', 'carmen.sanchez@example.com'),
('David Fernandez', '78901234', '+34978901234', 'david.fernandez@example.com'),
('Laura Gomez', '89012345', '+34989012345', 'laura.gomez@example.com'),
('Sergio Diaz', '90123456', '+34990123456', 'sergio.diaz@example.com'),
('Elena Romero', '11223344', '+34911223344', 'elena.romero@example.com'),
('Pablo Navarro', '22334455', '+34922334455', 'pablo.navarro@example.com'),
('Isabel Morales', '33445566', '+34933445566', 'isabel.morales@example.com'),
('Jorge Torres', '44556677', '+34944556677', 'jorge.torres@example.com'),
('Marta Ruiz', '55667788', '+34955667788', 'marta.ruiz@example.com'),
('Alberto Ortega', '66778899', '+34966778899', 'alberto.ortega@example.com'),
('Nuria Ramos', '77889900', '+34977889900', 'nuria.ramos@example.com'),
('Manuel Castro', '88990011', '+34988990011', 'manuel.castro@example.com'),
('Sofia Moreno', '99001122', '+34999001122', 'sofia.moreno@example.com'),
('Antonio Herrera', '10111213', '+34910111213', 'antonio.herrera@example.com'),
('Lucia Cruz', '12131415', '+34912131415', 'lucia.cruz@example.com'),
('Diego Flores', '13141516', '+34913141516', 'diego.flores@example.com'),
('Patricia Jimenez', '14151617', '+34914151617', 'patricia.jimenez@example.com'),
('Andres Vazquez', '15161718', '+34915161718', 'andres.vazquez@example.com'),
('Paula Molina', '16171819', '+34916171819', 'paula.molina@example.com'),
('Fernando Delgado', '17181920', '+34917181920', 'fernando.delgado@example.com'),
('Raquel Pena', '18192021', '+34918192021', 'raquel.pena@example.com'),
('Miguel Alonso', '19202122', '+34919202122', 'miguel.alonso@example.com'),
('Teresa Cabrera', '20212223', '+34920212223', 'teresa.cabrera@example.com'),
('Ruben Vega', '21222324', '+34921222324', 'ruben.vega@example.com'),
('Clara Ortiz', '22232425', '+34922232425', 'clara.ortiz@example.com'),
('Hugo Gil', '23242526', '+34923242526', 'hugo.gil@example.com');

INSERT INTO reservas (id_huesped, id_habitacion, fecha_entrada, fecha_salida, total_pagado, estado_reserva) VALUES 
(1, 4, '2023-04-01', '2023-04-05', 200.00, 'Finalizada'),
(1, 4, '2023-04-10', '2023-04-15', 250.00, 'Finalizada'),
(1, 4, '2023-05-01', '2023-05-07', 300.00, 'Activa'),
(1, 4, '2023-05-20', '2023-05-25', 200.00, 'Activa'),
(1, 4, '2023-06-01', '2023-06-10', 450.00, 'Cancelada');
