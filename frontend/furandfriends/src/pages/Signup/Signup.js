import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { signup } from '../../services/authService';
import '../Signup/SignupStyle.css';

const Signup = () => {
  const [formData, setFormData] = useState({ email: '', password: '', name: '', role: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("Updated Form Data:", formData); // Log form changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    console.log("Submitting Form Data:", formData); // Log final form data before sending

    if (!formData.email || !formData.password || !formData.name || !formData.role) {
      setError('All fields are required');
      console.error("Form validation failed: Missing required fields");
      return;
    }

    try {
      console.log("Attempting Signup...");
      const data = await signup(formData);
      console.log("Signup Response:", data);

      if (data.userId) {
        localStorage.setItem('userId', data.userId);
        console.log("Signup successful, navigating to:", formData.role === 'elderly' ? '/welcome-elderly' : '/welcome-volunteer');
        navigate(formData.role === 'elderly' ? '/welcome-elderly' : '/welcome-volunteer');
      } else {
        setError(data.message || 'Signup failed. Try again.');
      }
    } catch (error) {
      console.error("Request failed:", error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome to Fur & Friends!</h2>

        {/* Social Login Section */}
        <div className="social-login">
          <p>Sign up with one of these</p>
          <div className="social-buttons">
            <button className="google-btn"><FaGoogle /></button>
            <button className="facebook-btn"><FaFacebook /></button>
            <button className="apple-btn"><FaApple /></button>
          </div>
        </div>

        <p className="divider">or</p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          
          <label>Select Role:</label>
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="">Choose a role</option>
            <option value="elderly">Elderly</option>
            <option value="volunteer">Volunteer</option>
          </select>

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
