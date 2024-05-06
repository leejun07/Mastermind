import { NextFunction, Request, Response } from 'express';
import { gameCache } from '../services/gameCacheService';
import { gameManagementService } from '../services/gameManagementService';
import { validationService } from '../services/validationService';

/**
 * Controller for handling Mastermind game operations.
 */
const gameController = {
  /**
   * Starts a new game session.
   * @function startGame
   * @memberof gameController
   * Input: User provided difficultyLevel
   * Output: User data to start the game
   */
  startGame: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { difficultyLevel } = req.body;

      // Validate the start request
      const validationResponse = validationService.validateStartRequest(difficultyLevel, res);
      if (validationResponse) return next(validationResponse);

      // Get initial game data
      const { solution } = await gameManagementService.getInitialGameData(difficultyLevel);

      // Initialize game cache
      const newGameCache = gameCache.initializeGameCache(solution, difficultyLevel);
      res.locals.gameCache = newGameCache;
      return next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  /**
   * Handles the game logic during play.
   * @function playGame
   * @memberof gameController
   * Inputs: DifficultyLevel and user guess
   * Output: Updated user data
   */
  playGame: (req: Request, res: Response, next: NextFunction) => {
    const { guess, difficultyLevel } = req.body;
    const { solution } = gameCache.currentGameCache;
    const isGameOver = gameCache.currentGameCache.isGameOver.status;
    try {
      // Validate the user's guess
      const validationResponse = validationService.validateGuess(
        guess,
        difficultyLevel,
        isGameOver,
        res
      );
      if (validationResponse) return next(validationResponse);

      // Get feedback for the guess
      const feedback = gameManagementService.getFeedback(guess, solution);

      // Update the game cache with the guess and feedback
      gameCache.updateGameCache(guess, feedback.response);
      const currentGuessCount = gameCache.currentGameCache.currentGuessCount;

      // Check for win or loss conditions
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
