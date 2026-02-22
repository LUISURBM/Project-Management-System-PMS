// CRUD actions for `huespedes` (guests)
// Table structure expected:
// CREATE TABLE huespedes (
//   id_huesped INT AUTO_INCREMENT PRIMARY KEY,
//   nombre_completo VARCHAR(150) NOT NULL,
//   documento_identidad VARCHAR(20) UNIQUE,
//   telefono VARCHAR(20),
//   email VARCHAR(100)
// );

NEWACTION('Guest|list', {
    name: 'List all guests',
    route: 'GET  /api/huespedes',
    action: async function ($) {
        // Use autoquery to allow filtering/paging similar to other actions
        let response = await DATA.list('huespedes').autoquery($.query, 'id_huesped:Number, nombre_completo:String, documento_identidad:String, telefono:String, email:String', 'id_huesped_asc', 100).promise($);
        $.callback(response);
    }
});

NEWACTION('Guest|get', {
    name: 'Get a specific guest',
    route: 'GET  /api/huespedes/{id}',
    input: '*id:Number',
    action: async function ($, model) {
        let response = await DATA.read('huespedes').id(model.id).error(404).promise($);
        $.callback(response);
    }
});

NEWACTION('Guest|create', {
    name: 'Create new guest',
    route: 'POST /api/huespedes',
    input: '*nombre_completo:String, documento_identidad:String, telefono:String, email:String',
    action: async function ($, model) {
        console.log('Creating guest with data:', model);
        let response = await DATA.insert('huespedes', model).promise($);
        $.success(response);
    }
});

NEWACTION('Guest|update', {
    name: 'Update guest',
    route: 'PUT  /api/huespedes/{id}',
    input: '*id:Number, nombre_completo:String, documento_identidad:String, telefono:String, email:String',
    action: async function ($, model) {
        let id = model.id;
        delete model.id;
        await DATA.modify('huespedes', model).id(id).error(404).promise($);
        $.success(id);
    }
});

NEWACTION('Guest|remove', {
    name: 'Delete guest',
    route: 'DELETE /api/huespedes/{id}',
    input: '*id:Number',
    action: async function ($, model) {
        await DATA.remove('huespedes').id(model.id).error(404).promise($);
        $.success(model.id);
    }
});

// Optional: quick search by name or document
NEWACTION('Guest|search', {
    name: 'Search guests by name or document',
    route: 'GET /api/huespedes/search',
    action: async function ($) {
        const term = $.query.term || '';
        if (!term) {
            $.callback([]);
            return;
        }
        console.log('Searching guests with term:', term);
        const builder = DATA.find('huespedes');
        // Usamos un solo bloque where con la lógica SQL explícita
        if (term) {
            const t = '%' + term.toLowerCase() + '%';
            builder.or(function () {
                // .search adds the %wildcards% automatically
                this.search('nombre_completo', t);
                this.search('documento_identidad', t);
            });
        }

        const list = await builder.limit(50).promise($);

        $.callback(list);
    }
});
