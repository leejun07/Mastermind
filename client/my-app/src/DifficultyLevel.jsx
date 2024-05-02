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
    setButtonColors({
      Easy: '',
      Normal: '',
      Hard: '',
    });
    setButtonColors((prevColors) => ({
      ...prevColors,
      [difficultyLevel]: 'green',
    }));

    try {
      const response = await axios.post('http://localhost:8080/game/start', {
        difficultyLevel: difficultyLevel,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error sending difficulty level:', error);
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
