import { NextFunction, Request, Response } from 'express';

export const validateGuess = (req: Request, res: Response, next: NextFunction) => {
  const { guess } = req.body;
  const isValidGuess = guess.split('').every((digit: string) => {
    const numericDigit = parseInt(digit, 10);
    return !isNaN(numericDigit) && numericDigit >= 0 && numericDigit <= 7;
  });

  if (!isValidGuess) {
    return res.status(400).json({
      log: 'Invalid submitted guess',
      status: 400,
      message: { err: 'Invalid submitted guess' },
    });
  }
};
