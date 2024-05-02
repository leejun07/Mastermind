import React, { useState } from 'react';
import { DifficultyLevel } from './DifficultyLevel';
import axios from 'axios';
import { difficultySettings } from './difficultySettings';

export const Game = () => {
  const [difficultyLevel, setDifficultyLevel] = useState('');
  const [guessHistory, setGuessHistory] = useState([]);
  const [feedbackHistory, setFeedbackHistory] = useState([]);
  const [userGuess, setUserGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);

  const handleDifficultyLevelChange = (level) => {
    setDifficultyLevel(level);
    setGuessHistory([]);
    setFeedbackHistory([]);
    setIsGameOver(false);
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
        guess,
        difficultyLevel,
      });

      if (response.data.currentCache.isGameOver.status === true) {
        alert(`${response.data.currentCache.isGameOver.message}`);
        setIsGameOver(true);
        return;
      }
      setGuessHistory([...guessHistory, guess]);
      setFeedbackHistory([...feedbackHistory, response.data.feedback.response]);
      console.log(response.data);
    } catch (error) {
      console.error('Error playing the game:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isGameOver) {
      handlePlayGame(userGuess);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vh',
        textAlign: 'center',
        maxHeight: '100vh',
        padding: '20px',
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
          <h3>Guess History</h3>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {guessHistory.map((guess, index) => (
              <li key={index}>{guess}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Feedback History</h3>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {feedbackHistory.map((feedback, index) => (
              <li key={index}>{feedback}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
