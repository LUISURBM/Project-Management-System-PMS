// Initializes Total.js framework 5

require('total5');

const options = {};

Total.run(options);
setTimeout(() => console.log('DEBUG -> process.env.DATABASE_CONNECTION', process.env.DATABASE_CONNECTION), 2000);
setTimeout(() => console.log('DEBUG -> process.env.NODE_ENV', process.env.NODE_ENV), 2000);
setTimeout(() => console.log('DEBUG -> process.env.RAILWAY_ENVIRONMENT_NAME', process.env.RAILWAY_ENVIRONMENT_NAME), 2000);
setTimeout(() => console.log('DEBUG -> Mode:', CONF.release ? 'RELEASE' : 'DEBUG'), 2000);
setTimeout(() => console.log('INIT ==> Current Database Config:', CONF.database), 2000);
setTimeout(() => {
    console.log('--- SYSTEM CHECK ---');
    console.log('Flag (options.release):', options.release);
    console.log('Database URL:', CONF.database); // If this shows your Railway URL, it worked!
    console.log('Mode (CONF.debug):', CONF.debug); // Total 5 uses CONF.debug internally
}, 2000);