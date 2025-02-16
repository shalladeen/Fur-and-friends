import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log("Login Response Data:", data); // ✅ Debugging
  
      if (response.ok) {
        if (!data.role) {
          alert("Login successful but no role found. Please check the database.");
          return;
        }
  
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
  
        if (data.role === 'volunteer') {
          navigate('/volunteer-form');
        } else if (data.role === 'elderly') {
          navigate('/connect');
        } else {
          navigate('/');
        }
  
        window.location.reload();
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
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
