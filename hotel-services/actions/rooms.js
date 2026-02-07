// Rooms CRUD actions for hotel management system
// Uses the habitaciones table from hotel_db

NEWACTION('Rooms|list', {
	name: 'List all rooms',
	route: 'GET  /api/rooms',
	action: async function($) {
        console.log('Current Database Config 🔎:', CONF.database);
		// List all rooms with optional filtering, sorting and pagination
		let response = await DATA.list('habitaciones').autoquery($.query, 'id_habitacion:Number, numero:String, tipo:String, precio_base:Decimal, id_estado:Number, notas_extras:String', 'id_habitacion_asc', 100).promise($);
		$.callback(response);
	}
});

NEWACTION('Rooms|get', {
	name: 'Get a specific room',
	route: 'GET  /api/rooms/{id}',
	input: '*id:Number',
	action: async function($, model) {
		// Read a specific room by ID
		let response = await DATA.read('habitaciones').id(model.id).error(404).promise($);
		$.callback(response);
	}
});

NEWACTION('Rooms|create', {
	name: 'Create new room',
	route: 'POST /api/rooms',
	input: '*numero:String, *tipo:String, *precio_base:Decimal, id_estado:Number, notas_extras:String',
	action: async function($, model) {
		// Set default estado if not provided (1 = Libre)
		if (!model.id_estado)
			model.id_estado = 1;

		// Insert the new room
		let response = await DATA.insert('habitaciones', model).promise($);
		
		// Return the inserted room data
		$.success(response);
	}
});

NEWACTION('Rooms|update', {
	name: 'Update room',
	route: 'PUT  /api/rooms/{id}',
	input: '*id:Number, numero:String, tipo:String, precio_base:Decimal, id_estado:Number, notas_extras:String',
	action: async function($, model) {
		// Update room data
		let id = model.id;
		delete model.id; // Remove id from model to avoid duplicate field
		await DATA.modify('habitaciones', model).id(id).error(404).promise($);
		$.success(id);
	}
});

NEWACTION('Rooms|remove', {
	name: 'Delete room',
	route: 'DELETE /api/rooms/{id}',
	input: '*id:Number',
	action: async function($, model) {
		// Delete a room
		await DATA.remove('habitaciones').id(model.id).error(404).promise($);
		$.success(model.id);
	}
});
