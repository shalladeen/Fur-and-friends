import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../Navbar/Navbar.css';
import logo from '../Images/Logo.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    window.addEventListener('storage', checkAuth); // Listen for login/logout updates across tabs
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          <img src={logo} alt="Fur and Friends Logo" className="logo-img" />
        </Link>
        <span className="logo-text">Fur & Friends</span>
      </div>

      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li><Link to="/" className="button-link" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/connect" className="button-link" onClick={() => setMenuOpen(false)}>Connect</Link></li>
        <li><Link to="/volunteer-form" className="button-link" onClick={() => setMenuOpen(false)}>Volunteer</Link></li>
        <li><Link to="/contact" className="button-link" onClick={() => setMenuOpen(false)}>Contact</Link></li>

        <li className="mobile-signup">
          {isAuthenticated ? (
            <Link to="/" className="button-link" onClick={() => { handleLogout(); setMenuOpen(false); }}>
              Sign Out
            </Link>
          ) : (
            <Link to="/signup" className="button-link" onClick={() => setMenuOpen(false)}>
              Sign Up / Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
