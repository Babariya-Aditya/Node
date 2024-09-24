const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host : "localhost",
    user : "postgres",
    port : 5432,
    password : "1234",
    database : "college"
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
