// Initializes Total.js framework 5
console.log('INIT --> process.env.DATABASE_CONNECTION', process.env.DATABASE_CONNECTION);
require('total5');
const options = {};

if (process.env.DATABASE_CONNECTION) {
    process.env.database = process.env.DATABASE_CONNECTION;
}
global.CONF = global.CONF || {};
CONF.database = process.env.DATABASE_CONNECTION;
options.release = true;
// options.directory = __dirname + '/../';
options.config = {
    database: process.env.DATABASE_CONNECTION
};
Total.run(options);
setTimeout(() => console.log('CONF after Total.run:', CONF), 2000); // Debugging line to check CONF after initialization
setTimeout(() => console.log('INIT ==> CONF.database', CONF.database), 2000);