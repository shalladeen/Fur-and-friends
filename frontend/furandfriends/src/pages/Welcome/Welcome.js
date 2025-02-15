/*import React from 'react';
import './WelcomeStyle.css';

const ElderlyWelcome = () => {
  return (
    <div className="welcome-container">
      <h2>Welcome, Elderly Member! 👴</h2>
      <p>We're excited to match you with a friendly volunteer. Let's get started!</p>
    </div>
  );
};*/

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeStyle.css';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Fur & Friends! 🐾</h1>
        <p>
          Connecting compassionate volunteers with elderly individuals and matching loving pets with caring homes.  
          Build friendships, share skills, and make a difference in someone's life today!
        </p>
        <button className="get-started-btn" onClick={() => navigate('/signup')}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;

/*import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeStyle.css';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>🐾 Welcome to Fur & Friends!</h1>
        <p className="tagline">
          Building friendships, sharing love, and creating lasting connections.
        </p>
        <p>
          Join our community where elderly individuals can find companionship,  
          volunteers can share their time, and loving pets can find warm homes.
        </p>

        <button className="get-started-btn" onClick={() => navigate('/signup')}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;*/
