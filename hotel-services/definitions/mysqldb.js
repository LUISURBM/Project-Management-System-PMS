const options = {
  host: 'localhost',
  port: 3306,
  user: 'app_user',
  password: 'strong_password',
  database: 'hotel_db',
  connectionLimit: 10
};

require('mysql2').createPool(options);
