import { NextFunction, Request, Response } from 'express';
import { GameCacheService } from '../services/GameCacheService';
import gameManagementService from '../services/GameManagementService';
import { validateGuess } from '../utils/validateGuess';

const gameCache = new GameCacheService();

const gameController: any = {};

gameController.startGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { difficultyLevel } = req.body;
    const { solution } = await gameManagementService.getInitialGameData(difficultyLevel);
    const newGameCache = gameCache.initializeGameCache(solution, difficultyLevel);
    res.locals.gameCache = newGameCache;
    return next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

gameController.playGame = (req: Request, res: Response, next: NextFunction) => {
  const { guess } = req.body;
  const { solution } = gameCache.currentGameCache;
  try {
    const feedback = gameManagementService.getFeedback(
      guess,
      solution,
      gameCache.currentGameCache.currentGuessCount
    );
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
};

export default gameController;
