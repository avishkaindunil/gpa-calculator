// frontend/src/components/GpaResult.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';  // Make sure jsPDF is imported


const GpaResult = ({ user }) => {
  const [subjects, setSubjects] = useState([]);
  const [gpa, setGpa] = useState(0);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/subjects/${user.id}`);
        setSubjects(response.data);
        calculateGpa(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
        alert('Error fetching subjects');
      }
    };

    fetchSubjects();
  }, [user.id]);

  const calculateGpa = (subjects) => {
    let totalCredits = 0;
    let totalPoints = 0;

    subjects.forEach((subject) => {
      const gradePoints = getGradePoints(subject.grade);
      totalCredits += subject.credits;
      totalPoints += gradePoints * subject.credits;
    });

    if (totalCredits === 0) return;

    const calculatedGpa = totalPoints / totalCredits;
    setGpa(calculatedGpa.toFixed(2)); // GPA with two decimal places
  };

  const getGradePoints = (grade) => {
    switch (grade.toUpperCase()) {
      case 'A':
        return 4.0;
      case 'B':
        return 3.0;
      case 'C':
        return 2.0;
      case 'D':
        return 1.0;
      case 'F':
        return 0.0;
      default:
        return 0.0;
    }
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(`GPA Calculation for ${user.first_name} ${user.last_name}`, 20, 20);
    doc.text(`University: ${user.university_name}`, 20, 30);

    let yPosition = 40;
    subjects.forEach((subject) => {
      doc.text(`${subject.subject_name} - ${subject.grade} - ${subject.credits} credits`, 20, yPosition);
      yPosition += 10;
    });

    doc.text(`GPA: ${gpa}`, 20, yPosition + 10);

    doc.save('gpa_calculation.pdf');
  };

  return (
    <div className="gpa-result">
      <h2>GPA Calculation</h2>
      <div>
        <h3>Subjects:</h3>
        <ul>
          {subjects.map((subject, index) => (
            <li key={index}>
              {subject.subject_name} - {subject.grade} - {subject.credits} credits
            </li>
          ))}
        </ul>
      </div>
      <h3>Calculated GPA: {gpa}</h3>
      <button onClick={handleDownloadPdf}>Download GPA PDF</button>
    </div>
  );
};

export default GpaResult;
