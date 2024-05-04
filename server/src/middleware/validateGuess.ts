import { NextFunction, Request, Response } from 'express';
import { difficultyLevels } from '../configs/difficultySettings';

export const validateGuess = (req: Request, res: Response, next: NextFunction) => {
  const { guess, difficultyLevel } = req.body;

  const validDigits = () => {
    for (let char of guess) {
      if (char < 0 || char > 7 || isNaN(char)) {
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
};
