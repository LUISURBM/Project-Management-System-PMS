// Initializes Total.js framework 5

require('total5');

const options = {};
if (process.env.MYSQL_URL) {
    process.env.database = process.env.DATABASE_CONNECTION;
}
options.release = true;
options.directory = __dirname + '/../';
options.config = {
    database: process.env.DATABASE_CONNECTION || process.env.MYSQL_URL
};
Total.run(options);
// setTimeout(() => console.log('Mode (CONF.release):', CONF.release), 2000);
// setTimeout(() => console.log('Mode (CONF.debug):', CONF.debug), 2000);
setTimeout(() => console.log('INIT ==> Current Database Config:', CONF.database), 2000);
// setTimeout(() => console.log('DEBUG -> process.env', process.env), 2000);
// setTimeout(() => console.log('DEBUG -> process.env.MYSQL_URL', process.env.MYSQL_URL), 2000);
setTimeout(() => console.log('DEBUG -> process.env.DATABASE_CONNECTION', process.env.DATABASE_CONNECTION), 2000);
// setTimeout(() => console.log('DEBUG -> process.env.NODE_ENV', process.env.NODE_ENV), 2000);
// setTimeout(() => console.log('DEBUG -> process.env.RAILWAY_ENVIRONMENT_NAME', process.env.RAILWAY_ENVIRONMENT_NAME), 2000);