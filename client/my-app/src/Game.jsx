import React, { useState } from 'react';
import { DifficultyLevel } from './DifficultyLevel';
import axios from 'axios';
import { difficultySettings } from './difficultySettings';

export const Game = () => {
  const [difficultyLevel, setDifficultyLevel] = useState('');
  const [guessHistory, setGuessHistory] = useState([]);
  const [feedbackHistory, setFeedbackHistory] = useState([]);
  const [userGuess, setUserGuess] = useState(''); // State to manage the user's guess

  const handleDifficultyLevelChange = (level) => {
    setDifficultyLevel(level);
  };

  const handlePlayGame = async (guess) => {
    if (!difficultyLevel) {
      alert('Please select a difficulty level first.');
      return;
    }

    const expectedLength = difficultySettings[difficultyLevel];
    if (guess.length !== expectedLength) {
      alert(`Your guess must be ${expectedLength} characters long.`);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/game/play', {
        guess: guess,
        difficultyLevel: difficultyLevel,
      });

      setGuessHistory([...guessHistory, guess]);
      setFeedbackHistory([...feedbackHistory, response.data.feedback.response]);

      console.log(response.data); // Log the response data for debugging
    } catch (error) {
      console.error('Error playing the game:', error);
      // Handle the error as needed
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from submitting normally
    handlePlayGame(userGuess); // Call handlePlayGame with the user's guess
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        overflow: 'auto', // Enable scrolling
        maxHeight: '100vh', // Ensure the container does not exceed the viewport height
        border: '1px solid #000', // Optional: Add a border to visualize the box
        padding: '20px', // Optional: Add some padding inside the box
      }}
    >
      <DifficultyLevel onDifficultyLevelChange={handleDifficultyLevelChange} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          placeholder="Enter your guess"
        />
        <button type="submit">Submit Guess</button>
      </form>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div>
          <h3>Guess History:</h3>
          <ul>
            {guessHistory.map((guess, index) => (
              <li key={index}>{guess}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Feedback History:</h3>
          <ul>
            {feedbackHistory.map((feedback, index) => (
              <li key={index}>{feedback}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
