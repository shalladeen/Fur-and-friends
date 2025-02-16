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
    setFormData(prevState => {
      const updatedState = { ...prevState, [e.target.name]: e.target.value };
      console.log("Updated Form Data:", updatedState); // ✅ Logs the correct state
      return updatedState;
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password || !formData.name || !formData.role) {
        setError('All fields are required');
        return;
    }

    try {
        const data = await signup({
            name: formData.name,
            email: formData.email,  // Ensure email is sent
            password: formData.password,
            role: formData.role,
            age: formData.age || null, 
            gender: formData.gender || null,
            address: formData.address || null,
            interests: formData.interests || [],
            skills: formData.skills || [],
            availability: formData.availability || []
        });

        console.log("✅ Signup Response:", data);

        if (data.userId) {
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('userRole', formData.role);
          
          if (data.token) { // 🔥 Store token if the API returns one
              localStorage.setItem('token', data.token);
          }
      
          console.log("✅ Successfully signed up, redirecting...");
          if (formData.role === 'volunteer') {
              navigate('/volunteer-form');
          } else {
              navigate('/connect');
          }
      } else {
          setError(data.message || 'Signup failed. Try again.');
      }
      
      
    } catch (error) {
        console.error("🚨 Request failed:", error);
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

        {/* Login Redirect Button */}
        <p className="toggle-text">
          Already have an account?
          <button onClick={() => navigate('/login')} className="toggle-btn">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
