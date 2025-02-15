import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar/Navbar.css';
import logo from '../Images/Logo.png';

const Navbar = () => {
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
            <Link to="/Connect" className="button-link">Connect</Link>
          </li>
          <li>
            <Link to="/Volunteer" className="button-link">Volunteer</Link>
          </li>
          <li>
            <Link to="/Contact" className="button-link">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <Link to="/signup" className="button-link">
          Sign Up / Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;