import { NextFunction, Request, Response } from 'express';
import { GameCacheService } from '../services/GameCacheService';
import gameManagementService from '../services/GameManagementService';
import { validateGuess } from '../utils/validateGuess';

const gameCache = new GameCacheService();

const gameController: any = {};

gameController.startGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { solution } = await gameManagementService.getInitialGameData();
    const test = gameCache.initializeGameCache(solution);
    res.locals.gameCache = test;
    return next();
  } catch (error) {
    console.log(error);
  }
};

gameController.playGame = (req: Request, res: Response, next: NextFunction) => {
  const { guess } = req.body;
  const { solution } = gameCache.currentGameCache;
  try {
    validateGuess(guess);
    const feedback = gameManagementService.getFeedback(guess, solution);
    gameCache.updateGameCache(guess, feedback.response);
    res.locals.gameData = {
      currentCache: gameCache.currentGameCache,
      currentGuess: guess,
      feedback,
    };

    if (feedback.won === true || gameCache.currentGameCache.currentGuessCount === 0) {
      gameCache.updateGameCacheUponCompletion(feedback);
    }
    return next();
  } catch (error) {
    console.log(error);
  }
};

export default gameController;
