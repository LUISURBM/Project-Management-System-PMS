// Booking CRUD actions for hotel management system
// Uses the reservas table from hotel_db

NEWACTION('Booking|list', {
	name: 'List all bookings',
	route: 'GET  /api/bookings',
	action: async function ($) {
		console.log('🔎 bookings:', CONF.database);
		console.log('🔎 bookings:', $);
		// List all bookings with optional filtering, sorting and pagination
		let response = await DATA.list('reservas').autoquery($.query, 'id_reserva:Number, id_habitacion:Number, id_huesped:Number, fecha_entrada:Date, fecha_salida:Date, estado_reserva:String, total_pagado:Number', 'id_reserva_asc', 100).promise($);
		$.callback(response);
	}
});

NEWACTION('Booking|get', {
	name: 'Get a specific booking',
	route: 'GET  /api/bookings/{id}',
	input: '*id:Number',
	action: async function ($, model) {
		// Read a specific booking by ID
		let response = await DATA.read('reservas').id(model.id).error(404).promise($);
		$.callback(response);
	}
});

NEWACTION('Booking|create', {
	name: 'Create new booking',
	route: 'POST /api/bookings',
	input: '*id_habitacion:Number, *id_huesped:Number, *fecha_entrada:Date, *fecha_salida:Date, estado_reserva:String, notas:String',
	action: async function ($, model) {
		console.log('Creating booking with data:', model);
		// Set default estado_reserva if not provided (e.g., 'reservada')
		if (!model.estado_reserva)
			model.estado_reserva = 'reservada';

		// Insert the new booking
		let response = await DATA.insert('reservas', model).promise($);

		// Return the inserted reserva data
		$.success(response);
	}
});

NEWACTION('Booking|update', {
	name: 'Update reserva',
	route: 'PUT  /api/reservas/{id}',
	input: '*id:Number, id_habitacion:Number, id_huesped:Number, fecha_entrada:Date, fecha_salida:Date, estado_reserva:String, notas:String',
	action: async function ($, model) {
		// Update reserva data
		let id = model.id;
		delete model.id; // Remove id from model to avoid duplicate field
		await DATA.modify('reservas', model).id(id).error(404).promise($);
		$.success(id);
	}
});

NEWACTION('Booking|remove', {
	name: 'Delete reserva',
	route: 'DELETE /api/reservas/{id}',
	input: '*id:Number',
	action: async function ($, model) {
		// Delete a reserva
		await DATA.remove('reservas').id(model.id).error(404).promise($);
		$.success(model.id);
	}
});

NEWACTION('Booking|list', {
	name: 'Get bookings by room',
	// Definimos la ruta con el parámetro id_habitacion
	route: 'GET /api/bookings/{id_habitacion}/rooms',
	action: async function ($) {

		// Obtenemos el ID desde los parámetros de la URL
		var id = $.params.id_habitacion;
		console.log('🔎 bookings for room id:', id);

		// Buscamos en la base de datos
		// Usamos .promise($) para manejar errores automáticamente
		try {
			// The $ symbol is the controller/operation instance
			var sql = `
    SELECT 
        r.id_reserva as id, 
        r.fecha_entrada, 
        r.fecha_salida, 
        r.estado_reserva, 
        h.numero AS id_habitacion, 
        hu.nombre_completo AS id_huesped,
		r.total_pagado
    FROM reservas r
    INNER JOIN habitaciones h ON h.id_habitacion = r.id_habitacion
    INNER JOIN huespedes hu ON hu.id_huesped = r.id_huesped
    WHERE r.id_habitacion = ${+id}
    ORDER BY r.fecha_entrada ASC
`;

			// Execute the raw query with parameters to prevent SQL injection
			var list = await DB().query(sql).promise($);
			console.log('🔎 bookings', list);

			$.callback(list);
		} catch (error) {
			console.log('Error fetching bookings:', error);
			$.error(500, 'Error fetching bookings');
		}
	}
});