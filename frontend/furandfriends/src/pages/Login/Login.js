import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", formData);
    // Add login API call here
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login to Fur & Friends</h2>
        
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />

          <button type="submit">Login</button>
        </form>

        {/* Redirect to Signup Page */}
        <p className="toggle-text">
          Don't have an account?
          <button onClick={() => navigate('/signup')} className="toggle-btn">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
