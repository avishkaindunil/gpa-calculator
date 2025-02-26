// frontend/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserForm from './components/UserForm';
import SubjectForm from './components/SubjectForm';
import GpaResult from './components/GpaResults';
import ErrorBoundary from './components/ErrorBoundary'; // Import the ErrorBoundary component

function App() {
  const [user, setUser] = useState(null);

  const handleUserSubmit = (userData) => {
    setUser(userData);
    // Save user data to backend (optional)
  };

  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<UserForm onSubmit={handleUserSubmit} />} />
            <Route path="/subjects" element={<SubjectForm user={user} />} />
            <Route path="/gpa" element={<GpaResult user={user} />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
