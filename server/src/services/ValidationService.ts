import { Response } from 'express';
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

    if (isGameOver) {
      return res.status(400).json({
        log: 'Game is over. Please start a new game by selecting difficulty level',
        status: 400,
        message: { err: 'Game is over. Please start a new game by selecting difficulty level' },
      });
    }

    if (!validLength) {
      return res.status(400).json({
        log: `Your guess must be ${difficultyLevels[difficultyLevel]} characters long.`,
        status: 400,
        message: {
          err: `Your guess must be ${difficultyLevels[difficultyLevel]} characters long.`,
        },
      });
    }
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
