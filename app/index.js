const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: 'root',
  password: 'root',
  database: 'my_database'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

app.get('/', (req, res) => {
  db.query('INSERT INTO people (name) VALUES ("John")', (err, result) => {
    if (err) {
      console.error('Error inserting name into database:', err);
      res.status(500).send('Error inserting name into database');
      return;
    }
    console.log('Name inserted into database');
    res.send('<h1>Full Cycle Rocks!</h1><br/><h2>List of names:</h2><br/><ul><li>John</li></ul>');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
