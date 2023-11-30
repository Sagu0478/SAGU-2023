const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../.env.local' });

// Set up a pool of connections to be reused
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to execute queries using the connection pool
async function query(sql, values = []) {
  let connection;
  try {
    // Get a connection from the pool
    connection = await pool.getConnection();
    // Execute the query using the pooled connection
    const [results] = await connection.execute(sql, values);
    return results;
  } catch (error) {
    throw Error(error.message); // It's often not recommended to throw errors in an async function without handling them properly.
  } finally {
    // Release the connection back to the pool
    if (connection) connection.release();
  }
}

pool.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});

pool.on('release', function (connection) {
  console.log('Connection %d released', connection.threadId);
});

pool.on('error', function (err) {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});


// Export the `query` function
module.exports = { query };
