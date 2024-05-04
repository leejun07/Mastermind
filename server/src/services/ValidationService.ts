import { NextFunction, Response } from 'express';
import { difficultyLevels } from '../configs/difficultySettings';

class ValidationService {
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
  validateGuess(guess: string, difficultyLevel: string, currentGuessCount: number, res: Response) {
    const validDigits = () => {
      for (let char of guess) {
        if (Number(char) < 0 || Number(char) > 7 || isNaN(Number(char))) {
          return false;
        }
      }
      return true;
    };

    const validLength = guess.length === difficultyLevels[difficultyLevel];

    if (currentGuessCount < 1) {
      return res.status(400).json({
        log: 'User out of guesses',
        status: 400,
        message: { err: 'User out of guesses' },
      });
    }

    if (!validDigits() || !validLength) {
      return res.status(400).json({
        log: 'Invalid submitted guess',
        status: 400,
        message: { err: 'Invalid submitted guess' },
      });
    }
  }
}

export const validationService = new ValidationService();
