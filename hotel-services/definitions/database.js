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
// /definitions/database.js

ON('ready', function() {
    
    // Total.js v5 uses 'dbms' as the primary database wrapper
    const conn = CONF.database;

    if (conn) {
        // This line is what actually "Initializes" the database
        require('dbms').init(conn, ERROR('DBMS'));
        
        // Log to verify it's not localhost anymore
        console.log('---> DBMS: Initialized with host:', conn.split('@')[1]);
    } else {
        console.error('---> DBMS: ERROR! No connection string found in CONF.database');
    }
});