// // /definitions/database.js

// // 1. Check if config exists immediately
// if (CONF.database) {
    
//     // 2. Initialize IMMEDIATELY (outside any ON('ready') block)
//     // This allows the DBMS to register the driver while the framework is booting
//     require('querybuildermysql2').init('default', CONF.database);

//     console.log('---> DBMS: Initializing with ' + CONF.database.split('@')[1]); // Logs host only for safety
// } else {
//     console.error('---> DBMS: "database" connection string is missing in config!');
// }

// // Optional: Just use ready for a success message
// ON('ready', () => console.log('---> Framework is ready, DB should be active.'));
// /definitions/database.js

// Priority 1: Use the Variable from index.js (CONF.database)
// Priority 2: Use the Direct Railway Env Var
const connectionString = CONF.database || process.env.MYSQL_URL || process.env.DATABASE_CONNECTION;

if (connectionString) {
    // We use the dbms module which handles the mysql2 driver internally
    require('dbms').init(connectionString, ERROR('DBMS'));
    
    // Log the sanitized host so you can see it's NOT localhost
    const host = connectionString.split('@')[1] || connectionString;
    console.log('---> DBMS: Initializing with ' + host);
} else {
    console.error('---> DBMS: ERROR - No connection string found!');
}