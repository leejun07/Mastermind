import { Response } from 'express';
import { difficultyLevels } from '../configs/difficultySettings';

class ValidationService {
  validateStartRequest(difficultyLevel: string, res: Response) {
    const difficultyLevels = ['Easy', 'Normal', 'Hard'];
    if (!difficultyLevel || !difficultyLevels.includes(difficultyLevel)) {
      throw new Error('Invalid difficulty level');
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
      throw new Error('User is out of guess');
    }

    if (!validDigits() || !validLength) {
      throw new Error('Invalid submitted guess');
    }
  }
}

export const validationService = new ValidationService();
