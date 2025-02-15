import React, { useState } from 'react'; // Import useState
import { Link } from 'react-router-dom'; // Import Link
import '../Navbar/Navbar.css';
import logo from '../Images/Logo.png'; // Ensure the path to the logo is correct

const Navbar = () => {
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);

  const toggleLoginPopup = () => {
    setLoginPopupOpen(!isLoginPopupOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          <img src={logo} alt="Fur and Friends Logo" className="logo-img" />
        </Link>
        <span className="logo-text">Fur and Friends</span>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <Link to="/signup" className="button-link">Sign Up</Link>
          </li>
          <li>
            <Link to="/welcome-elderly" className="button-link">About Us</Link>
          </li>
          <li>
            <Link to="/welcome-volunteer" className="button-link">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <button className="login-button button-link" onClick={toggleLoginPopup}>
          Login
        </button>
        {isLoginPopupOpen && (
          <div className="login-popup">
            <div className="login-popup-content">
              <h3>Login</h3>
              <form>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" />
                <button type="submit">Login</button>
              </form>
              <div className="login-popup-links">
                <Link to="/signup">Create Account</Link>
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
              <button className="close-popup" onClick={toggleLoginPopup}>
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;