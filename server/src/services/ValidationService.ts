import { Response } from 'express';
import { difficultyLevels } from '../configs/difficultySettings';

/**
 * Service for validating game inputs.
 */
class ValidationService {
  /**
   * Validates the start request for a new game.
   * Inputs: difficultyLevel - The selected difficulty level and res - Express response object.
   * Output: JSON response if validation fails, undefined otherwise.
   */
  validateStartRequest(difficultyLevel: string, res: Response) {
    const difficultyLevels = ['Easy', 'Normal', 'Hard'];
    if (!difficultyLevel || !difficultyLevels.includes(difficultyLevel)) {
      return res.status(400).json({
        log: 'Invalid difficulty level',
        status: 400,
        message: { err: 'Invalid difficulty level' },
      });
    }
  }

  /**
   * Validates a user's guess during gameplay.
   * Inputs: guess, difficultyLevel, isGameOver, res
   * Output: JSON response if validation fails, undefined otherwise.
   */
  validateGuess(guess: string, difficultyLevel: string, isGameOver: boolean, res: Response) {
    const validDigits = () => {
      for (let char of guess) {
        if (Number(char) < 0 || Number(char) > 7 || isNaN(Number(char))) {
          return false;
        }
      }
      return true;
    };

    const validLength = guess.length === difficultyLevels[difficultyLevel];

    // Check if the game is over
    if (isGameOver) {
      return res.status(400).json({
        log: 'Game is over. Please start a new game by selecting difficulty level',
        status: 400,
        message: { err: 'Game is over. Please start a new game by selecting difficulty level' },
      });
    }

    // Check if the user input is of valid length
    if (!validLength) {
      return res.status(400).json({
        log: `Your guess must be ${difficultyLevels[difficultyLevel]} characters long.`,
        status: 400,
        message: {
          err: `Your guess must be ${difficultyLevels[difficultyLevel]} characters long.`,
        },
      });
    }

    // Check if user input contains any numbers greater than 7
    if (!validDigits()) {
      return res.status(400).json({
        log: 'Your guess must not include numbers greater than 7',
        status: 400,
        message: { err: 'Your guess must not include numbers greater than 7' },
      });
    }
  }
}

export const validationService = new ValidationService();
