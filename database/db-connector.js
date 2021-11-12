// ./database/db_connector.js

// Require mysql so that we can use it in our app
var mysql = require('mysql')

// Create a pool
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_dunnk',
    password        : '1875',
    database        : 'cs340_dunnk'
});

// Export it to use in our application as 'pool'
module.exports.pool = pool;