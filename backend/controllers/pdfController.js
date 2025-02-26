// backend/controllers/pdfController.js
const PDFDocument = require('pdfkit');
const fs = require('fs');

const generateGpaPdf = (user, subjects, res) => {
  const doc = new PDFDocument();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=gpa.pdf');

  doc.pipe(res);

  doc.fontSize(20).text(`GPA Calculation for ${user.first_name} ${user.last_name}`, { align: 'center' });
  doc.image(user.university_logo, 50, 50, { width: 100 });
  doc.text(`University: ${user.university_name}`, { align: 'center' });
  
  // Table of Subjects and Grades
  doc.text('Subjects:', { underline: true });
  subjects.forEach(subject => {
    doc.text(`${subject.subject_name} - ${subject.grade} - ${subject.credits} credits`);
  });

  // Add GPA Calculation logic here (based on grades and credits)

  doc.end();
};

module.exports = { generateGpaPdf };
