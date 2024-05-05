import { NextFunction, Request, Response } from 'express';
import { gameCache } from '../services/gameCacheService';
import { gameManagementService } from '../services/gameManagementService';
import { validationService } from '../services/validationService';

const gameController = {
  startGame: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { difficultyLevel } = req.body;
      validationService.validateStartRequest(difficultyLevel, res);
      const { solution } = await gameManagementService.getInitialGameData(difficultyLevel);
      const newGameCache = gameCache.initializeGameCache(solution, difficultyLevel);
      res.locals.gameCache = newGameCache;
      return next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  playGame: (req: Request, res: Response, next: NextFunction) => {
    const { guess, difficultyLevel } = req.body;
    const { solution } = gameCache.currentGameCache;
    const currentGuessCount = gameCache.currentGameCache.currentGuessCount;
    try {
      validationService.validateGuess(guess, difficultyLevel, currentGuessCount, res);
      const feedback = gameManagementService.getFeedback(guess, solution);
      gameCache.updateGameCache(guess, feedback.response);

      if (feedback.won === true || gameCache.currentGameCache.currentGuessCount === 0) {
        gameCache.updateGameCacheUponCompletion(feedback);
      }
      res.locals.gameData = {
        currentCache: gameCache.currentGameCache,
        currentGuess: guess,
        feedback,
      };
      return next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
};

export default gameController;
