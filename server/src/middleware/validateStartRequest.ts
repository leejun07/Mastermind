import { NextFunction, Request, Response } from 'express';

export const validateStartRequest = (req: Request, res: Response, next: NextFunction) => {
  const { difficultyLevel } = req.body;
  const difficultyLevels = ['Easy', 'Normal', 'Hard'];
  if (!difficultyLevel || !difficultyLevels.includes(difficultyLevel)) {
    return res.status(400).json({
      log: 'Invalid difficulty level',
      status: 400,
      message: { err: 'Invalid difficulty level' },
    });
  }
  return next();
};
