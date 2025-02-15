import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar/Navbar.css'

const Navbar = () => {
  return (

<nav className="navbar">
  <div className="navbar-left">
    <a href="/" className="logo">
      Fur and Friends
    </a>
  </div>
  <div className="navbar-center">
    <ul className="nav-links">
      
      <li>
        <a href="/welcome-elderly">Home</a>
      </li>
        <li>
            <a href="/connect">Connect</a>
        </li>
      <li>
        <a href="/volunteer-form">Volunteer</a>
      </li>
      <li>
        <a href="/signup">Sign Up</a>
      </li>
    </ul>
  </div>
  <div className="navbar-right">
    <a href="/cart" className="cart-icon">
      <i className="fas fa-shopping-cart"></i>
      <span className="cart-count">0</span>
    </a>
    <a href="/account" className="user-icon">
      <i className="fas fa-user"></i>
    </a>
  </div>
</nav>
);
};


export default Navbar;