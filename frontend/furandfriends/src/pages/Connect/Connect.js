import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ConnectStyle.css';

const Connect = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    address: '',
    contact: '',
    idProof: null,
    interests: [],
    companionType: '', // Determines navigation
    allergies: '',
    petType: '',
    availabilityDays: [],
    availabilityStart: '',
    availabilityEnd: '',
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const petOptions = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];
  const interestOptions = ['Reading', 'Cooking', 'Music', 'Walking', 'Gardening', 'Technology', 'Crafting', 'Sports', 'Theater', 'Movies', 'Writing'];

  const [interestInput, setInterestInput] = useState('');
  const [filteredInterests, setFilteredInterests] = useState([]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? e.target.files[0] : value,
    }));
  };

  const handleDaySelection = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      availabilityDays: checked
        ? [...prev.availabilityDays, value]
        : prev.availabilityDays.filter((day) => day !== value),
    }));
  };

  const handleInterestInput = (e) => {
    const value = e.target.value;
    setInterestInput(value);

    setFilteredInterests(
      value.length > 0
        ? interestOptions.filter((interest) =>
            interest.toLowerCase().includes(value.toLowerCase())
          )
        : []
    );
  };

  const handleInterestSelect = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest) ? prev.interests : [...prev.interests, interest],
    }));
    setInterestInput('');
    setFilteredInterests([]);
  };

  const handleInterestRemove = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('🚨 No userId found in localStorage.');
      alert('User ID not found. Please log in again.');
      return;
    }

    console.log(`🛠 Submitting form for user ID: ${userId}`);

    try {
      const response = await fetch(`http://localhost:5001/api/users/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('✅ Update Response:', data);

      if (response.ok) {
        alert('Profile updated successfully!');

        // Navigate based on the selected companion type
        if (formData.companionType === 'volunteer') {
          console.log('🚀 Redirecting to Volunteer Recommendations...');
          navigate('/volunteer-recommendations');
        } else if (formData.companionType === 'pet') {
          console.log('🚀 Redirecting to Pet Recommendations...');
          navigate('/pet-recommendations');
        }
      } else {
        console.error('❌ Failed to update profile:', data.message);
        alert(data.message || 'Failed to update profile.');
      }
    } catch (error) {
      console.error('🚨 Update error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="connect-container">
      <div className="connect-box">
        <h2>🐾 Find a Companion</h2>
        <p>Please fill out this form to get matched with a volunteer or pet.</p>

        <form onSubmit={handleSubmit}>
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required min="18" max="120" />

          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />

          <label>Contact Number:</label>
          <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required />

          <label>Upload ID Proof:</label>
          <input type="file" name="idProof" accept="image/*,application/pdf" onChange={handleChange} required />

          <label>Would you like a companion or a pet?</label>
          <select name="companionType" value={formData.companionType} onChange={handleChange} required>
            <option value="">Select an option</option>
            <option value="volunteer">Volunteer</option>
            <option value="pet">Pet</option>
          </select>

          {formData.companionType === 'volunteer' && (
            <div className="form-group">
              <label>What are your interests?</label>
              <div className="interest-section">
                <input
                  type="text"
                  value={interestInput}
                  onChange={handleInterestInput}
                  placeholder="Type an interest..."
                />
                {filteredInterests.length > 0 && (
                  <ul className="interest-dropdown">
                    {filteredInterests.map((interest) => (
                      <li key={interest} onClick={() => handleInterestSelect(interest)}>
                        {interest}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="selected-interests">
                {formData.interests.map((interest) => (
                  <span key={interest} className="interest-tag">
                    {interest} <button type="button" onClick={() => handleInterestRemove(interest)}>✖</button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {formData.companionType === 'pet' && (
            <>
              <label>Do you have any pet allergies?</label>
              <input
                type="text"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                placeholder="E.g., None, Cats, Dogs"
              />

              <label>What kind of pet are you looking for?</label>
              <select name="petType" value={formData.petType} onChange={handleChange}>
                <option value="">Select an option</option>
                {petOptions.map((pet) => (
                  <option key={pet} value={pet}>
                    {pet}
                  </option>
                ))}
              </select>
            </>
          )}

          <label>Availability:</label>
          <div className="availability-days">
            {daysOfWeek.map((day) => (
              <label key={day}>
                <input type="checkbox" value={day} onChange={handleDaySelection} />
                {day}
              </label>
            ))}
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Connect;
