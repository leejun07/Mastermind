import React, { useState } from 'react';
import axios from 'axios';

export const DifficultyLevel = ({ onDifficultyLevelChange }) => {
  const [buttonColors, setButtonColors] = useState({
    Easy: '',
    Normal: '',
    Hard: '',
  });

  const handleButtonClick = async (difficultyLevel) => {
    onDifficultyLevelChange(difficultyLevel);
    // Reset all button colors to default
    setButtonColors({
      Easy: '',
      Normal: '',
      Hard: '',
    });
    // Set the clicked button color to green
    setButtonColors((prevColors) => ({
      ...prevColors,
      [difficultyLevel]: 'green',
    }));

    try {
      // Send a POST request to the server with the difficulty level
      const response = await axios.post('http://localhost:8080/game/start', {
        difficultyLevel: difficultyLevel,
      });

      console.log(response.data); // Log the response data for debugging
      // Handle the response as needed
    } catch (error) {
      console.error('Error sending difficulty level:', error);
      // Handle the error as needed
    }
  };

  return (
    <div>
      <button
        style={{ backgroundColor: buttonColors.Easy }}
        onClick={() => handleButtonClick('Easy')}
      >
        Easy
      </button>
      <button
        style={{ backgroundColor: buttonColors.Normal }}
        onClick={() => handleButtonClick('Normal')}
      >
        Normal
      </button>
      <button
        style={{ backgroundColor: buttonColors.Hard }}
        onClick={() => handleButtonClick('Hard')}
      >
        Hard
      </button>
    </div>
  );
};
