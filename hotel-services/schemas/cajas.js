NEWSCHEMA('Cajas', function(schema) {

    // Acción para Abrir Caja
    schema.action('abrir', {
        name: 'Abrir Caja',
        input: '*monto_inicial:Number',
        handler: function($) {
            var model = $.input;
            model.fecha_apertura = NOW;
            model.estado_caja = 'Abierta';
            model.id_usuario = $.user ? $.user.id : null; // Si tienes sesión

            DBMS().insert('cajas', model).callback(function(err, response) {
                if (err) return $.invalid(err);
                $.success();
            });
        }
    });

    // Acción para Registrar Gastos o Ingresos
    schema.action('movimiento', {
        name: 'Registrar movimiento',
        input: '*id_caja:Number, *monto:Number, *tipo_movimiento:String, descripcion:String',
        handler: function($) {
            // El objeto $.input ya contiene los datos validados
            DBMS().insert('movimientos_caja', $.input).callback($.done());
        }
    });

});