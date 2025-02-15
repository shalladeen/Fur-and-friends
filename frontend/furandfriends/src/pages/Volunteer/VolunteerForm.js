import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VolunteerStyles.css';

const VolunteerForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    contact: '',
    email: '',
    address: '',
    idProof: null,
    skills: [],
    availabilityDays: [],
    availabilityStart: '',
    availabilityEnd: '',
  });

  const skillsOptions = ['Cooking', 'Technology Assistance', 'Reading', 'Companionship', 'Exercise Support', 'Pet Care'];
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSkillSelection = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      skills: checked ? [...prev.skills, value] : prev.skills.filter((skill) => skill !== value),
    }));
  };

  const handleDaySelection = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      availabilityDays: checked ? [...prev.availabilityDays, value] : prev.availabilityDays.filter((day) => day !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Volunteer Form Submitted:', formData);
    navigate('/volunteer-motivation', { state: { formData } }); // Navigate to next page
  };

  return (
    <div className="volunteer-container">
      <div className="volunteer-box">
        <h2>🙌 Become a Volunteer</h2>
        <p>Fill out this form to get started.</p>

        <form onSubmit={handleSubmit}>
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required min="18" max="120" />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Contact Number:</label>
          <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required />

          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />

          <label>Upload ID Proof:</label>
          <input type="file" name="idProof" accept="image/*,application/pdf" onChange={handleChange} required />

          <label>What skills can you offer?</label>
          <div className="skills-section">
            {skillsOptions.map((skill) => (
              <label key={skill}>
                <input type="checkbox" value={skill} onChange={handleSkillSelection} />
                {skill}
              </label>
            ))}
          </div>

          <label>Availability:</label>
          <div className="availability-days">
            <p>Select Available Days:</p>
            {daysOfWeek.map((day) => (
              <label key={day}>
                <input type="checkbox" value={day} onChange={handleDaySelection} />
                {day}
              </label>
            ))}
          </div>

          <label>Select Available Hours:</label>
          <div className="availability-hours">
            <select name="availabilityStart" value={formData.availabilityStart} onChange={handleChange} required>
              <option value="">Start Time</option>
              {[...Array(24).keys()].map((hour) => (
                <option key={hour} value={`${hour}:00`}>{`${hour}:00`}</option>
              ))}
            </select>

            <select name="availabilityEnd" value={formData.availabilityEnd} onChange={handleChange} required>
              <option value="">End Time</option>
              {[...Array(24).keys()].map((hour) => (
                <option key={hour} value={`${hour}:00`}>{`${hour}:00`}</option>
              ))}
            </select>
          </div>

          <button type="submit" >Continue</button>
        </form>
      </div>
    </div>
  );
};

export default VolunteerForm;