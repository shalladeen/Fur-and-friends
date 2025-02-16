import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import './ConnectStyle.css';

const Connect = () => {
  const navigate = useNavigate(); // Initialize navigation
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    address: '',
    contact: '',
    idProof: null,
    interests: [],
    companionType: '',
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
    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDaySelection = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      availabilityDays: checked ? [...prev.availabilityDays, value] : prev.availabilityDays.filter((day) => day !== value),
    }));
  };

  const handleInterestInput = (e) => {
    const value = e.target.value;
    setInterestInput(value);

    if (value.length > 0) {
      const filtered = interestOptions.filter(interest => interest.toLowerCase().includes(value.toLowerCase()));
      setFilteredInterests(filtered);
    } else {
      setFilteredInterests([]);
    }
  };

  const handleInterestSelect = (interest) => {
    if (!formData.interests.includes(interest)) {
      setFormData((prev) => ({ ...prev, interests: [...prev.interests, interest] }));
    }
    setInterestInput('');
    setFilteredInterests([]);
  };

  const handleInterestRemove = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);

    if (formData.companionType === 'volunteer') {
      navigate('/volunteer-recommendations', { state: formData });
    } else if (formData.companionType === 'pet') {
      navigate('/Pet-Recommendation', { state: formData });
    }
  };

  return (
    <div className="connect-container">
      <div className="connect-box">
        <h2>🐾 Find a Companion</h2>
        <p>Please fill out this form to get matched with a volunteer or pet.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name:</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Last Name:</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Age:</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required min="18" max="120" />
          </div>

          <div className="form-group">
            <label>Address:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Contact Number:</label>
            <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Upload ID Proof:</label>
            <input type="file" name="idProof" accept="image/*,application/pdf" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Would you like a companion or a pet?</label>
            <select name="companionType" value={formData.companionType} onChange={handleChange} required>
              <option value="">Select an option</option>
              <option value="volunteer">Volunteer</option>
              <option value="pet">Pet</option>
            </select>
          </div>

          {formData.companionType === 'volunteer' && (
            <div className="form-group">
              <label>What are your interests?</label>
              <div className="interest-section">
                <input type="text" value={interestInput} onChange={handleInterestInput} placeholder="Type an interest..." />
                {filteredInterests.length > 0 && (
                  <ul className="interest-dropdown">
                    {filteredInterests.map((interest) => (
                      <li key={interest} onClick={() => handleInterestSelect(interest)}>{interest}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="selected-interests">
                {formData.interests.map((interest) => (
                  <span key={interest} className="interest-tag">
                    {interest} <button onClick={() => handleInterestRemove(interest)}>✖</button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {formData.companionType === 'pet' && (
            <>
              <div className="form-group">
                <label>Do you have any pet allergies?</label>
                <input type="text" name="allergies" value={formData.allergies} onChange={handleChange} placeholder="E.g., None, Cats, Dogs" />
              </div>

              <div className="form-group">
                <label>What kind of pet are you looking for?</label>
                <select name="petType" value={formData.petType} onChange={handleChange}>
                  <option value="">Select an option</option>
                  {petOptions.map((pet) => (
                    <option key={pet} value={pet}>{pet}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="form-group">
            <label>Availability:</label>
            <div className="availability-days">
              {daysOfWeek.map((day) => (
                <label key={day}>
                  <input type="checkbox" value={day} onChange={handleDaySelection} />
                  {day}
                </label>
              ))}
            </div>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Connect;