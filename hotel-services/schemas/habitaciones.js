NEWSCHEMA('Rooms', function(schema) {

    // Acción para listar habitaciones (Antiguo setQuery)
    // schema.action('query', {
    //     name: 'Listar habitaciones',
    //     handler: function($) {
    //         // Usamos .join para traer el nombre del estado (opcional pero recomendado)
    //         DBMS().find('habitaciones').callback($.callback);
    //     }
    // });

    // REST: lista todas las habitaciones
    schema.action('list', {
        name: 'Listar habitaciones (REST)',
        action: function($) {
            DBMS().find('habitaciones').callback($.callback);
        }
    });

    // REST: obtener una habitación por id
    // schema.action('get', {
    //     name: 'Obtener habitación',
    //     input: 'id:Number',
    //     handler: function($) {
    //         var id = $.input.id || ($.params && $.params.id) || ($.query && $.query.id);
    //         if (!id) return $.invalid('error-id');
    //         DBMS().one('habitaciones').where('id_habitacion', id).callback($.callback);
    //     }
    // });

    // Acción para actualizar habitación y notas (Antiguo setSave)
    // schema.action('save', {
    //     name: 'Actualizar habitación',
    //     input: '*id_habitacion:Number, id_estado:Number, notas_extras:String(2000)',
    //     handler: function($) {
    //         var model = $.input;

    //         // Actualizamos solo los campos enviados
    //         DBMS().update('habitaciones', model)
    //             .where('id_habitacion', model.id_habitacion)
    //             .callback(function(err, response) {
    //                 if (err) return $.invalid(err);
    //                 $.success(model.id_habitacion);
    //             });
    //     }
    // });

    // REST: crear nueva habitación
    // schema.action('create', {
    //     name: 'Crear habitación',
    //     input: 'numero:String(1,10), tipo:String(0,50), precio_base:Decimal, id_estado:Number, notas_extras:String(2000)',
    //     handler: function($) {
    //         var model = $.input;
    //         DBMS().insert('habitaciones', model).callback(function(err, result) {
    //             if (err) return $.invalid(err);
    //             // result may contain insertId
    //             $.success(result && result.insertId ? result.insertId : result);
    //         });
    //     }
    // });

    // REST: actualizar habitación por id
    // schema.action('update', {
    //     name: 'Actualizar habitación (REST)',
    //     input: '*id_habitacion:Number, numero:String(1,10), tipo:String(0,50), precio_base:Decimal, id_estado:Number, notas_extras:String(2000)',
    //     handler: function($) {
    //         var model = $.input;
    //         if (!model.id_habitacion) return $.invalid('error-id');
    //         DBMS().update('habitaciones', model)
    //             .where('id_habitacion', model.id_habitacion)
    //             .callback(function(err) {
    //                 if (err) return $.invalid(err);
    //                 $.success(model.id_habitacion);
    //             });
    //     }
    // });

    // REST: eliminar habitación
    // schema.action('delete', {
    //     name: 'Eliminar habitación',
    //     input: 'id_habitacion:Number',
    //     handler: function($) {
    //         var id = $.input.id_habitacion || ($.params && $.params.id) || ($.query && $.query.id);
    //         if (!id) return $.invalid('error-id');
    //         DBMS().remove('habitaciones').where('id_habitacion', id).callback(function(err) {
    //             if (err) return $.invalid(err);
    //             $.success(id);
    //         });
    //     }
    // });

});