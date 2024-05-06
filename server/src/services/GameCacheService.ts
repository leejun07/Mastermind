import { initialGameData } from '../configs/initialGameData';
import { FeedBack, GameCache } from '../types/types';

/**
 * Service for managing game caching and state.
 */
export class GameCacheService {
  /** The current state of the game cache. */
  currentGameCache: GameCache = initialGameData;

  /**
   * Initializes the game cache with the provided solution and difficulty level.
   * Inputs: Solution, difficultyLevel.
   * Output: Initialized game cache.
   */
  initializeGameCache(solution: string, difficultyLevel: string): GameCache {
    // Initialize the game cache with default values and provided data.
    this.currentGameCache = {
      difficultyLevel,
      solution: solution,
      currentGuessCount: 10,
      guessHistory: [],
      feedbackHistory: [],
      isGameOver: {
        status: false,
        message: '',
      },
    };
    return this.currentGameCache;
  }

  /**
   * Updates the game cache with a new guess and feedback.
   * Inputs: Guess, feedback.
   * Output: Updated game cache.
   */
  updateGameCache(guess: string, feedback: string): GameCache {
    // Create a new game cache with updated values based on the current cache.
    const updatedGameCache: GameCache = {
      ...this.currentGameCache,
      currentGuessCount: this.currentGameCache.currentGuessCount - 1,
      guessHistory: [...this.currentGameCache.guessHistory, guess],
      feedbackHistory: [...this.currentGameCache.feedbackHistory, feedback],
    };

    this.currentGameCache = updatedGameCache;
    return updatedGameCache;
  }

  /**
   * Updates the game cache upon game completion.
   * Input: Feedback.
   */
  updateGameCacheUponCompletion(feedback: FeedBack) {
    this.currentGameCache.isGameOver = {
      status: true,
      message: `${feedback.won ? 'WINNER (:' : 'Next time :/'}`,
    };
  }
}

export const gameCache = new GameCacheService();
