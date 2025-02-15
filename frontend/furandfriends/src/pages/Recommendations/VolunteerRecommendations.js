import React from "react";
import { useLocation } from "react-router-dom";
import "./VolunteerRecommendations.css"; // Importing the CSS file

const volunteerData = [
  {
    name: "Alice Johnson",
    interests: ["Reading", "Cooking"],
    availability: ["Monday", "Wednesday"],
    image: "/images/volunteer1.jpg",
    description: "Loves to read and share cooking recipes.",
  },
  {
    name: "John Smith",
    interests: ["Walking", "Gardening"],
    availability: ["Tuesday", "Thursday"],
    image: "/images/volunteer2.jpg",
    description: "Enjoys nature walks and taking care of plants.",
  },
  {
    name: "Sophia Lee",
    interests: ["Music", "Sports"],
    availability: ["Friday", "Saturday"],
    image: "/images/volunteer3.jpg",
    description: "A music enthusiast and active sports player.",
  },
];

const VolunteerRecommendations = () => {
  const location = useLocation();
  const preferences = location.state || {};

  // Filtering volunteers based on user preferences
  const filteredVolunteers = volunteerData.filter(
    (vol) =>
      vol.interests.some((interest) => preferences.interests?.includes(interest)) &&
      vol.availability.some((day) => preferences.availabilityDays?.includes(day))
  );

  return (
    <div className="volunteer-container">
      {/* Centered Title Section */}
      <div className="volunteer-header">
        <h1>Find Your Ideal Volunteer</h1>
        <p>Here are volunteers that match your interests and availability.</p>
      </div>

      {/* Volunteer Grid */}
      <div className="volunteer-grid">
        {filteredVolunteers.length > 0 ? (
          filteredVolunteers.map((vol, index) => (
            <div key={index} className="volunteer-card">
              <img src={vol.image} alt={vol.name} className="volunteer-image" />
              <div className="volunteer-info">
                <h3>{vol.name}</h3>
                <p>{vol.description}</p>
                <p><strong>Interests:</strong> {vol.interests.join(", ")}</p>
                <p><strong>Availability:</strong> {vol.availability.join(", ")}</p>
                <button className="volunteer-button">Connect with {vol.name}</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No matching volunteers found. Try adjusting your preferences.</p>
        )}
      </div>
    </div>
  );
};

export default VolunteerRecommendations;