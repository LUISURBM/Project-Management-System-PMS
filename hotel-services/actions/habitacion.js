// Habitaciones CRUD actions for hotel management system
// Uses the habitaciones table from hotel_db

NEWACTION('Habitacion|list', {
	name: 'List all habitaciones',
	route: 'API ?',
	action: async function($) {
		// List all rooms with optional filtering, sorting and pagination
		let response = await DATA.list('habitaciones').autoquery($.query, 'id_habitacion:Number, numero:String, tipo:String, precio_base:Decimal, id_estado:Number, notas_extras:String', 'id_habitacion_asc', 100).promise($);
		$.callback(response);
	}
});

NEWACTION('Habitacion|read', {
	name: 'Get a specific habitacion',
	input: '*id_habitacion:Number',
	route: 'API ?',
	action: async function($, model) {
		// Read a specific room by ID
		let response = await DATA.read('habitaciones').id(model.id_habitacion).error(404).promise($);
		$.callback(response);
	}
});

NEWACTION('Habitacion|create', {
	name: 'Create new habitacion',
	input: '*numero:String, *tipo:String, *precio_base:Decimal, id_estado:Number, notas_extras:String',
	route: 'API ?',
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

NEWACTION('Habitacion|update', {
	name: 'Update habitacion',
	input: '*id_habitacion:Number, numero:String, tipo:String, precio_base:Decimal, id_estado:Number, notas_extras:String',
	route: 'API ?',
	action: async function($, model) {
		// Update room data
		await DATA.modify('habitaciones', model).id(model.id_habitacion).error(404).promise($);
		$.success(model.id_habitacion);
	}
});

NEWACTION('Habitacion|remove', {
	name: 'Delete habitacion',
	input: '*id_habitacion:Number',
	route: 'API ?',
	action: async function($, model) {
		// Delete a room
		await DATA.remove('habitaciones').id(model.id_habitacion).error(404).promise($);
		$.success(model.id_habitacion);
	}
});