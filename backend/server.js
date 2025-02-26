// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');  // MySQL connection
const userRoutes = require('./routes/userRoutes');
const subjectRoutes = require('./routes/subjectRoutes');

const app = express();

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',  // or '127.0.0.1'
  user: 'root',       // replace with your MySQL username
  password: '',       // replace with your MySQL password
  database: 'gpa_db'  // replace with your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
    process.exit(1);  // Exit the application if the database connection fails
  }
  console.log('Connected to MySQL database');
});

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/subjects', subjectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
