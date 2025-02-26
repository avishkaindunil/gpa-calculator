import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Removed useHistory, kept useNavigate

const SubjectForm = ({ user }) => {
  const [subjectName, setSubjectName] = useState('');
  const [grade, setGrade] = useState('');
  const [credits, setCredits] = useState('');
  const [subjects, setSubjects] = useState([]);
  
  const navigate = useNavigate();  // Replaced useHistory with useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subjectName || !grade || !credits) {
      alert('Please fill in all fields');
      return;
    }

    // Send subject data to backend
    const subjectData = {
      user_id: user.id,
      subject_name: subjectName,
      grade,
      credits: parseInt(credits),
    };

    try {
      await axios.post('http://localhost:5000/api/subjects/add', subjectData);
      setSubjects([...subjects, subjectData]); // Update the subjects array in state
      setSubjectName('');
      setGrade('');
      setCredits('');
    } catch (error) {
      console.error('Error adding subject:', error);
      alert('Error adding subject');
    }
  };

  const handleNext = () => {
    navigate('/gpa'); // Used navigate instead of history.push
  };

  return (
    <div className="subject-form">
      <h2>Add Subjects</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Subject Name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Grade (A, B, C, etc.)"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <input
          type="number"
          placeholder="Credits"
          value={credits}
          onChange={(e) => setCredits(e.target.value)}
        />
        <button type="submit">Add Subject</button>
      </form>

      <div className="subjects-list">
        <h3>Subjects List</h3>
        <ul>
          {subjects.map((subject, index) => (
            <li key={index}>
              {subject.subject_name} - {subject.grade} - {subject.credits} credits
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handleNext} disabled={subjects.length === 0}>
        Next (Calculate GPA)
      </button>
    </div>
  );
};

export default SubjectForm;
