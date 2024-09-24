// app.js
const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./database');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Create a new student
app.post('/students', async (req, res) => {
  const { name } = req.body;
  const insertQuery = 'INSERT INTO student (name) VALUES ($1) RETURNING *';

  try {
    const result = await pool.query(insertQuery, [name]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read all students
app.get('/students', async (req, res) => {
  const selectQuery = 'SELECT * FROM student';

  try {
    const result = await pool.query(selectQuery);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read a single student by ID
app.get('/students/:id', async (req, res) => {
  const { id } = req.params;
  const selectQuery = 'SELECT * FROM student WHERE id = $1';

  try {
    const result = await pool.query(selectQuery, [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a student by ID
app.put('/students/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const updateQuery = 'UPDATE student SET name = $1 WHERE id = $2 RETURNING *';

  try {
    const result = await pool.query(updateQuery, [name, id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a student by ID
app.delete('/students/:id', async (req, res) => {
  const { id } = req.params;
  const deleteQuery = 'DELETE FROM student WHERE id = $1 RETURNING *';

  try {
    const result = await pool.query(deleteQuery, [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

