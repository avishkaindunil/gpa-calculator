// frontend/src/components/UserForm.js
import React, { useState } from 'react';

const UserForm = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [university, setUniversity] = useState('');
  const [logo, setLogo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ firstName, lastName, university, logo });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <input type="text" placeholder="University Name" value={university} onChange={(e) => setUniversity(e.target.value)} />
      <input type="file" onChange={(e) => setLogo(URL.createObjectURL(e.target.files[0]))} />
      <button type="submit">Next</button>
    </form>
  );
};

export default UserForm;
