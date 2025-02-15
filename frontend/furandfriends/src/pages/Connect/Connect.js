import React, { useState } from 'react';
import './ConnectStyle.css';

const Connect = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    address: '',
    contact: '',
    idProof: null,
    interests: '',
    companionType: '',
    availabilityDays: [],
    availabilityStart: '',
    availabilityEnd: '',
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handles availability days checkboxes
  const handleDaySelection = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      availabilityDays: checked
        ? [...prev.availabilityDays, value]
        : prev.availabilityDays.filter((day) => day !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    alert('Thank you! Your details have been submitted.');
  };

  return (
    <div className="connect-container">
      <div className="connect-box">
        <h2>👴 Connect with a Companion</h2>
        <p>Please fill out this form to get matched with a volunteer or pet.</p>

        <form onSubmit={handleSubmit}>
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="18"
            max="120"
          />

          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />

          <label>Contact Number:</label>
          <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required />

          <label>Upload ID Proof:</label>
          <input type="file" name="idProof" accept="image/*,application/pdf" onChange={handleChange} required />

          <label>What are your interests?</label>
          <textarea name="interests" value={formData.interests} onChange={handleChange} placeholder="E.g., Reading, Gardening, Walking" />

          <label>Would you like a companion or a pet?</label>
          <select name="companionType" value={formData.companionType} onChange={handleChange} required>
            <option value="">Select an option</option>
            <option value="volunteer">Volunteer</option>
            <option value="pet">Pet</option>
            <option value="both">Both</option>
          </select>

          {/* Availability Section */}
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

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Connect;