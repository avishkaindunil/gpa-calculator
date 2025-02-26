// backend/controllers/subjectController.js
const db = require('../db');

const addSubject = (req, res) => {
  const { user_id, subject_name, grade, credits } = req.body;
  const query = 'INSERT INTO subjects (user_id, subject_name, grade, credits) VALUES (?, ?, ?, ?)';

  db.query(query, [user_id, subject_name, grade, credits], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error adding subject.' });
    } else {
      res.status(200).json({ message: 'Subject added successfully.' });
    }
  });
};

const getSubjectsByUserId = (req, res) => {
  const { userId } = req.params;
  const query = 'SELECT * FROM subjects WHERE user_id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching subjects.' });
    } else {
      res.status(200).json(results);
    }
  });
};

module.exports = { addSubject, getSubjectsByUserId };
