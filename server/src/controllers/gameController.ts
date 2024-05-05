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
    const isGameOver = gameCache.currentGameCache.isGameOver.status;
    try {
      const validationResponse = validationService.validateGuess(
        guess,
        difficultyLevel,
        isGameOver,
        res
      );
      if (validationResponse) return next(validationResponse);
      const feedback = gameManagementService.getFeedback(guess, solution);
      gameCache.updateGameCache(guess, feedback.response);
      const currentGuessCount = gameCache.currentGameCache.currentGuessCount;

      if (feedback.won === true || currentGuessCount === 0) {
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
