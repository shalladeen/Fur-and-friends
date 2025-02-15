import React, { useState, useEffect } from "react";
import "./PetRecommendation.css"; // Import your CSS file
import Dog1 from "../../components/Images/Dog1.jpeg";
import Dog2 from "../../components/Images/Dog2.jpg";
import Dog3 from "../../components/Images/Dog3.jpg";
import Cat1 from "../../components/Images/Cat1.jpg";
import Cat2 from "../../components/Images/Cat2.jpg";
import Cat3 from "../../components/Images/Cat3.jpg";
import Bird1 from "../../components/Images/Bird1.jpg";
import Bird2 from "../../components/Images/Bird2.jpg";
import Bird3 from "../../components/Images/Bird3.jpg";
import Rabbit1 from "../../components/Images/Rabbit1.jpg";
import Rabbit2 from "../../components/Images/Rabbit2.jpg";
import Rabbit3 from "../../components/Images/Rabbit3.jpg";
import Fish1 from "../../components/Images/Fish1.jpg";
import Fish2 from "../../components/Images/Fish2.jpg";
import Fish3 from "../../components/Images/Fish3.jpg";

const PetRecommendation = () => {
  const [animalType, setAnimalType] = useState(""); // Selected animal type
  const [pets, setPets] = useState([]); // List of all pets from the database
  const [recommendedPets, setRecommendedPets] = useState([]); // Filtered pets

  // Mock database with 3 options for each animal type
  const mockDatabase = [
    // Dogs
    {
      id: 1,
      name: "Golden Retriever",
      type: "dog",
      description: "Friendly and energetic.",
      image: Dog1,
    },
    {
      id: 2,
      name: "German Shepherd",
      type: "dog",
      description: "Loyal and intelligent.",
      image: Dog2,
    },
    {
      id: 3,
      name: "Bulldog",
      type: "dog",
      description: "Calm and courageous.",
      image: Dog3,
    },

    // Cats
    {
      id: 4,
      name: "Siamese Cat",
      type: "cat",
      description: "Playful and affectionate.",
      image: Cat1,
    },
    {
      id: 5,
      name: "Persian Cat",
      type: "cat",
      description: "Gentle and quiet.",
      image: Cat2,
    },
    {
      id: 6,
      name: "Scottish Straight",
      type: "cat",
      description: "Friendly and loving.",
      image: Cat3,
    },

    // Birds
    {
      id: 7,
      name: "Parakeet",
      type: "bird",
      description: "Colorful and social.",
      image: Bird1,
    },
    {
      id: 8,
      name: "Cockatiel",
      type: "bird",
      description: "Curious and affectionate.",
      image: Bird2,
    },
    {
      id: 9,
      name: "Canary",
      type: "bird",
      description: "Cheerful and melodious.",
      image: Bird3,
    },

    // Rabbits
    {
      id: 10,
      name: "Holland Lop Rabbit",
      type: "rabbit",
      description: "Gentle and calm.",
      image: Rabbit1,
    },
    {
      id: 11,
      name: "Mini Rex Rabbit",
      type: "rabbit",
      description: "Soft and playful.",
      image: Rabbit2,
    },
    {
      id: 12,
      name: "Lionhead Rabbit",
      type: "rabbit",
      description: "Friendly and fluffy.",
      image: Rabbit3,
    },

    // Fish
    {
      id: 13,
      name: "Betta Fish",
      type: "fish",
      description: "Low-maintenance and beautiful.",
      image: Fish1,
    },
    {
      id: 14,
      name: "Goldfish",
      type: "fish",
      description: "Hardy and vibrant.",
      image: Fish2,
    },
    {
      id: 15,
      name: "Guppy",
      type: "fish",
      description: "Colorful and easy to care for.",
      image: Fish3,
    },
  ];

  // Simulate fetching data from a database (useEffect)
  useEffect(() => {
    // Replace this with an API call to fetch pets from your database
    setPets(mockDatabase);
  }, []);

  // Handle animal type selection
  const handleAnimalTypeChange = (event) => {
    const selectedType = event.target.value;
    setAnimalType(selectedType);

    // Filter pets based on the selected type
    const filteredPets = pets.filter((pet) => pet.type === selectedType);
    setRecommendedPets(filteredPets);
  };

  // Handle Connect Button Click
  const handleConnectClick = (petId) => {
    alert(`Connecting you to the owner of pet ID: ${petId}`); // Replace with actual logic
  };

  return (
    <div className="pet-recommendation-container">
      <div className="pet-recommendation-box">
        <h2>Find Your Perfect Pet</h2>
        <p className="subtitle">Select the type of animal you're interested in:</p>

        {/* Animal Type Dropdown */}
        <div className="dropdown-container">
          <select
            value={animalType}
            onChange={handleAnimalTypeChange}
            className="animal-type-dropdown"
          >
            <option value="">Select an animal type</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="rabbit">Rabbit</option>
            <option value="fish">Fish</option>
          </select>
        </div>

        {/* Recommended Pets */}
        <div className="recommended-pets">
          <h3>Recommended Pets</h3>
          {recommendedPets.length > 0 ? (
            <div className="pet-list">
              {recommendedPets.map((pet) => (
                <div key={pet.id} className="pet-card">
                  <img src={pet.image} alt={pet.name} className="pet-image" />
                  <div className="pet-details">
                    <h4>{pet.name}</h4>
                    <p><strong>Type:</strong> {pet.type}</p>
                    <p><strong>Description:</strong> {pet.description}</p>
                    <button
                      className="connect-button"
                      onClick={() => handleConnectClick(pet.id)}
                    >
                      Connect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-results">No pets match your selection. Please choose an animal type.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetRecommendation;