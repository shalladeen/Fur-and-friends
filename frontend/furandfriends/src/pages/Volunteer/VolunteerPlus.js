import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './VolunteerStyles.css';

const VolunteerPlus = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData || {}; // Retrieve previous form data

  const [motivation, setMotivation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = { ...formData, motivation };
    console.log('Final Volunteer Data:', finalData);
    alert('Your volunteer application has been submitted!');
    navigate('/thank-you'); // Redirect to a thank-you page
  };

  return (
    <div className="volunteer-container">
      <div className="volunteer-box">
        <h2>📝 Why Do You Want to Volunteer?</h2>
        <p>Please explain in a few sentences why you want to join Fur & Friends.</p>

        <form onSubmit={handleSubmit}>
          <textarea value={motivation} onChange={(e) => setMotivation(e.target.value)} required placeholder="Write your response here..." />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default VolunteerPlus;