import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../Navbar/Navbar.css';
import logo from '../Images/Logo.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      {/* Left Section (Logo) */}
      <div className="navbar-left">
        <Link to="/" className="logo">
          <img src={logo} alt="Fur and Friends Logo" className="logo-img" />
        </Link>
        <span className="logo-text">Fur & Friends</span>
      </div>

      {/* Hamburger Icon (Mobile) */}
      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Center Section (Nav Links) */}
      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li><Link to="/Connect" className="button-link" onClick={() => setMenuOpen(false)}>Connect</Link></li>
        <li><Link to="/Volunteer-form" className="button-link" onClick={() => setMenuOpen(false)}>Volunteer</Link></li>
        <li><Link to="/Contact" className="button-link" onClick={() => setMenuOpen(false)}>Contact</Link></li>
        {/* This Sign Up / Login button should ONLY be visible in the mobile menu */}
        <li className="mobile-signup"><Link to="/signup" className="button-link" onClick={() => setMenuOpen(false)}>Sign Up / Login</Link></li>
      </ul>

    </nav>
  );
};

export default Navbar;
