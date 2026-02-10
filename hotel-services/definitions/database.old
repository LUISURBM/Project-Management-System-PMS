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

// We wrap this in a function or check to ensure we get the LATEST CONF.database
// which was injected by index.js
ON('boot', function() {
    const conn = CONF.database || process.env.DATABASE_CONNECTION;

    if (conn) {
        // V5 uses 'dbms' to bridge QueryBuilder and the Total.js core
        require('dbms').init(conn, ERROR('DBMS'));
        
        const host = conn.split('@')[1] || 'URL present';
        console.log('---> DBMS: Initialized with host:', host);
    } else {
        console.error('---> DBMS: CRITICAL ERROR - No connection string found!');
    }
});