import React, { useState } from 'react';
import { DifficultyLevel } from './DifficultyLevel';
import axios from 'axios';

export const Game = () => {
  const [difficultyLevel, setDifficultyLevel] = useState('');
  const [guessHistory, setGuessHistory] = useState([]);
  const [feedbackHistory, setFeedbackHistory] = useState([]);
  const [userGuess, setUserGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [guessCount, setGuessCount] = useState(10);

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

    try {
      const response = await axios.post('http://localhost:8080/game/play', {
        guess,
        difficultyLevel,
      });
      setGuessHistory([...guessHistory, guess]);
      setFeedbackHistory([...feedbackHistory, response.data.feedback.response]);
      if (response.data.currentCache.isGameOver.status === true) {
        setGuessCount(0);
        setTimeout(() => {
          alert(`${response.data.currentCache.isGameOver.message}`);
          setIsGameOver(true);
        }, 500);
        return;
      }
      setGuessCount(response.data.currentCache.currentGuessCount);

      console.log(response.data);
    } catch (error) {
      console.error('Error playing the game:', error);
      alert(`${error.response.data.log}`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isGameOver) {
      handlePlayGame(userGuess);
      setUserGuess('');
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
      <h2>Mastermind</h2>
      <DifficultyLevel
        onDifficultyLevelChange={handleDifficultyLevelChange}
        style={{ marginBottom: '20px' }}
      />
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          placeholder="Enter your guess"
        />
        <button type="submit">Submit Guess</button>
      </form>
      {difficultyLevel && <div>{guessCount} guesses left</div>}
      {difficultyLevel && guessHistory.length > 0 && (
        <div style={{ display: 'flex', gap: '20px' }}>
          <div>
            <h4>Guess History</h4>
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
              {guessHistory.map((guess, index) => (
                <li key={index}>{guess}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Feedback History</h4>
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
              {feedbackHistory.map((feedback, index) => (
                <li key={index}>{feedback}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
