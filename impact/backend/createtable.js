// createTable.js
const pool = require('./database');

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
  );
`;

const createTable = async () => {
  try {
    await pool.query(createTableQuery);
    console.log('Table "students" created successfully.');
  } catch (err) {
    console.error('Error creating table:', err);
  } finally {
    await pool.end();
  }
};

createTable();
