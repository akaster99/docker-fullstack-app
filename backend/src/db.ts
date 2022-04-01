const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql',
    user: 'root',
    password: '123123ok',
    database: 'myapp',
    // port:3306
});
exports.pool = pool; 