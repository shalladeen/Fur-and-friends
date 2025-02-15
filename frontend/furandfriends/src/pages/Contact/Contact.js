import React, { useState } from 'react';
import './ContactStyle.css';
import PawLetterIcon from '../../components/Images/paw-letter-icon.png'; // Closed icon
import PawLetterOpenIcon from '../../components/Images/paw-letter-open.png'; // Opened icon

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    alert('Thank you for contacting us! We will get back to you soon.');
  };

  return (
    <div className="contact-container">
      <div className="contact-box">
        <div className="contact-header">
          <div className="icon-container">
            <img src={PawLetterIcon} alt="Paw Letter Icon" className="paw-letter-icon closed-icon" />
            <img src={PawLetterOpenIcon} alt="Paw Letter Open Icon" className="paw-letter-icon open-icon" />
          </div>
          <h2>Contact Us</h2>
        </div>
        <p>Have questions or feedback? Reach out to us!</p>

        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter the subject"
            required
          />

          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            rows="5"
            required
          />

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;