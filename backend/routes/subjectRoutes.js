// backend/routes/subjectRoutes.js
const express = require('express');
const router = express.Router();
const { addSubject, getSubjectsByUserId } = require('../controllers/subjectController');

router.post('/add', addSubject);
router.get('/:userId', getSubjectsByUserId);

module.exports = router;
