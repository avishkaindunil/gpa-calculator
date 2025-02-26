// backend/controllers/userController.js
const db = require('../db');

const createUser = (req, res) => {
  const { first_name, last_name, university_name, university_logo } = req.body;
  const query = 'INSERT INTO users (first_name, last_name, university_name, university_logo) VALUES (?, ?, ?, ?)';
  
  db.query(query, [first_name, last_name, university_name, university_logo], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error creating user.' });
    } else {
      res.status(200).json({ userId: result.insertId });
    }
  });
};

module.exports = { createUser };
