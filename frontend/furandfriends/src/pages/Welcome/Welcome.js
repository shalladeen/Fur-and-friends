import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeStyle.css';
import Knitting from '../../components/Images/Knitting.jpg';
import Cooking from '../../components/Images/Cooking.jpg';
import Painting from '../../components/Images/Painting.jpg';
import Therapy from '../../components/Images/Therapy.jpg';

const Welcome = () => {
  const navigate = useNavigate();

  // Array of carousel items
  const carouselItems = [
    { image: Knitting, text: 'Knitting' },
    { image: Painting, text: 'Painting' },
    { image: Cooking, text: 'Cooking' },
    { image: Therapy, text: 'Therapy Pets' },
  ];

  return (
    <div>
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="banner-overlay"></div> {/* Semi-transparent overlay */}
        <div className="banner-content">
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

      {/* Activities Section with Carousel */}
      <div className="activities-section">
        <h2>Get Matched Today!</h2>
        <div className="carousel-container">
          <div className="carousel-track">
            {/* Repeat the carousel items to fill space */}
            {[...Array(6)].map((_, index) =>
              carouselItems.map((item, itemIndex) => (
                <div key={`${index}-${itemIndex}`} className="carousel-item">
                  <img src={item.image} alt={item.text} />
                  <p>{item.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;