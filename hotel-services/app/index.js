// Initializes Total.js framework 5

require('total5');


// Launches a web server
// Total.http({ load: 'none' });

const options = {};
// options.release = process.env.RAILWAY_ENVIRONMENT_NAME === 'production' || process.argv.includes('--release');
// Detectar Railway production

// options.ip = '127.0.0.1';
// options.port = parseInt(process.argv[2]);
// options.unixsocket = PATH.join(F.tmpdir, 'app_name.socket');
// options.unixsocket777 = true;
// options.config = { name: 'Total.js' };
// options.sleep = 3000;
// options.inspector = 9229;
// options.watch = ['private'];
// options.livereload = 'https://yourhostname';
// options.watcher = false; // disables watcher
// options.edit = 'wss://www.yourcodeinstance.com/?id=projectname'

// options.release = process.argv.includes('--release');

// Service mode:
// options.servicemode = process.argv.includes('--service') || process.argv.includes('--servicemode');
// options.servicemode = 'definitions,modules,config';

// Cluster:
// options.tz = 'utc';
// options.cluster = 'auto';
// options.limit = 10; // max 10. threads (works only with "auto" scaling)


Total.run(options);
setTimeout(() => console.log('DEBUG -> process.env.NODE_ENV', process.env.NODE_ENV), 2000);
setTimeout(() => console.log('DEBUG -> process.env.RAILWAY_ENVIRONMENT_NAME', process.env.RAILWAY_ENVIRONMENT_NAME), 2000);
setTimeout(() => console.log('DEBUG -> Mode:', CONF.release ? 'RELEASE' : 'DEBUG'), 2000);
setTimeout(() => console.log('INIT ==> Current Database Config:', CONF.database), 2000);
