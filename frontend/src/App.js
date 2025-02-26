// frontend/src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Routs, Router, Route, Link } from 'react-router-dom';

import UserForm from './components/UserForm';
import SubjectForm from './components/SubjectForm';
import GpaResult from './components/GpaResults';

function App() {
  const [user, setUser] = useState(null);

  const handleUserSubmit = (userData) => {
    setUser(userData);
    // Save user data to backend
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <UserForm onSubmit={handleUserSubmit} />
          </Route>
          <Route path="/subjects">
            <SubjectForm user={user} />
          </Route>
          <Route path="/gpa">
            <GpaResult user={user} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
