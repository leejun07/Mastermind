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
  validateGuess(guess: string, difficultyLevel: string, res: Response, next: NextFunction) {
    const validDigits = () => {
      for (let char of guess) {
        if (Number(char) < 0 || Number(char) > 7 || isNaN(Number(char))) {
          return false;
        }
      }
      return true;
    };

    const validLength = guess.length === difficultyLevels[difficultyLevel];

    if (validDigits() && validLength) {
      return next();
    } else {
      return res.status(400).json({
        log: 'Invalid submitted guess',
        status: 400,
        message: { err: 'Invalid submitted guess' },
      });
    }
  }
}

export const validationService = new ValidationService();
