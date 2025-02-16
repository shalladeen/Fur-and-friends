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

  const allSkills = [
    'Cooking', 'Technology Assistance', 'Reading', 'Companionship', 'Exercise Support', 'Pet Care', 'Music',
    'Teaching', 'Driving', 'Shopping Assistance', 'Event Planning', 'First Aid Training', 'Photography', 'Mental Health Support',
    'Home Repairs', 'Language Translation', 'Financial Assistance', 'Baking', 'Yoga & Meditation', 'Writing & Storytelling'
  ];

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const [skillInput, setSkillInput] = useState('');
  const [filteredSkills, setFilteredSkills] = useState([]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSkillInput = (e) => {
    const value = e.target.value;
    setSkillInput(value);

    if (value.length > 0) {
      const filtered = allSkills.filter(skill => skill.toLowerCase().includes(value.toLowerCase()));
      setFilteredSkills(filtered);
    } else {
      setFilteredSkills([]);
    }
  };

  const handleSkillSelect = (skill) => {
    if (!formData.skills.includes(skill)) {
      setFormData((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
    }
    setSkillInput('');
    setFilteredSkills([]);
  };

  const handleSkillRemove = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleDaySelection = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      availabilityDays: checked ? [...prev.availabilityDays, value] : prev.availabilityDays.filter((day) => day !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Retrieve user token
    const userId = localStorage.getItem('userId'); // Retrieve user ID
  
    try {
      const response = await fetch(`http://localhost:5001/api/volunteers/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Profile updated successfully!");
        navigate('/volunteer-plus');
      } else {
        alert(data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  return (
    <div className="volunteer-container">
      <div className="volunteer-box">
        <h2>🐾 Become a Volunteer</h2>
        <p>Join our friendly community and bring joy to someone’s life!</p>

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
            <input
              type="text"
              value={skillInput}
              onChange={handleSkillInput}
              placeholder="Type a skill..."
            />
            {filteredSkills.length > 0 && (
              <ul className="skills-dropdown">
                {filteredSkills.map((skill) => (
                  <li key={skill} onClick={() => handleSkillSelect(skill)}>{skill}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Selected Skills Display */}
          <div className="selected-skills">
            {formData.skills.map((skill) => (
              <span key={skill} className="skill-tag">
                {skill} <button onClick={() => handleSkillRemove(skill)}>✖</button>
              </span>
            ))}
          </div>

          <label>Availability:</label>
          <div className="availability-days">
            
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

          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default VolunteerForm;