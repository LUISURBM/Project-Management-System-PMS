// Initializes Total.js framework 5
console.log('INIT --> process.env.DATABASE_CONNECTION', process.env.DATABASE_CONNECTION);
require('total5');
const options = {};

if (process.env.DATABASE_CONNECTION) {
    process.env.database = process.env.DATABASE_CONNECTION;
}
options.release = true;
options.directory = __dirname + '/../';
options.config = {
    database: process.env.DATABASE_CONNECTION || process.env.MYSQL_URL
};
Total.run(options);
console.log('INIT ==> CONF.database', CONF.database);