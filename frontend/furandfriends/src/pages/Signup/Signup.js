import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa'; // Import icons
import '../Signup/SignupStyle.css';

const Signup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '', role: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin) {
      navigate(formData.role === 'elderly' ? '/welcome-elderly' : '/welcome-volunteer');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? 'Welcome Back!' : 'Welcome to Fur & Friends!'}</h2>

        {/* Social Login Section */}
        <div className="social-login">
          <p>{isLogin ? 'Login with one of these' : 'Sign up with one of these'}</p>
          <div className="social-buttons">
            <button className="google-btn"><FaGoogle /></button>
            <button className="facebook-btn"><FaFacebook /></button>
            <button className="apple-btn"><FaApple /></button>
          </div>
        </div>

        <p className="divider">or</p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              <label>Select Role:</label>
              <select name="role" value={formData.role} onChange={handleChange} required>
                <option value="">Choose a role</option>
                <option value="elderly">Elderly</option>
                <option value="volunteer">Volunteer</option>
              </select>
            </>
          )}

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />

          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;