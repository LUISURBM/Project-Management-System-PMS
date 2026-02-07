// /controllers/debug.js
exports.install = function() {
    ROUTE('GET /db-status', async function($) {
        // This will tell us if the config is even there
        try{
            var result = await DATA.query('SELECT 1 as connected').promise();
            var status = {
                config_val: CONF.database,
                dbms_loaded: !!require.cache[require.resolve('dbms')],
                message: 'Check your terminal for "DBMS" errors',
                test: $.json(result)
            };
            $.json(status);
        } catch (e) {
            // This will show you exactly WHY it's not initialized
            $.json(e);
        }
    });
};