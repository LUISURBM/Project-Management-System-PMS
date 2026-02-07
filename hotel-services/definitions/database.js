// /definitions/database.js

// 1. Check if config exists immediately
if (CONF.database) {
    
    // 2. Initialize IMMEDIATELY (outside any ON('ready') block)
    // This allows the DBMS to register the driver while the framework is booting
    require('querybuildermysql2').init('default', CONF.database);

    console.log('---> DBMS: Initializing with ' + CONF.database.split('@')[1]); // Logs host only for safety
} else {
    console.error('---> DBMS: "database" connection string is missing in config!');
}

// Optional: Just use ready for a success message
ON('ready', () => console.log('---> Framework is ready, DB should be active.'));