// Initializes Total.js framework 5
console.log('INIT --> process.env.DATABASE_CONNECTION', process.env.DATABASE_CONNECTION);
require('total5');
const options = {};
Total.run(options);
console.log('INIT ==> CONF.database', CONF.database);