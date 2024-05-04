import { initialGameData } from '../configs/initialGameData';
import { FeedBack, GameCache } from '../types/types';

class GameCacheService {
  currentGameCache: GameCache = initialGameData;

  initializeGameCache(solution: string, difficultyLevel: string): GameCache {
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

  updateGameCache(guess: string, feedback: string): GameCache {
    const updatedGameCache: GameCache = {
      ...this.currentGameCache,
      currentGuessCount: this.currentGameCache.currentGuessCount - 1,
      guessHistory: [...this.currentGameCache.guessHistory, guess],
      feedbackHistory: [...this.currentGameCache.feedbackHistory, feedback],
    };

    this.currentGameCache = updatedGameCache;
    return updatedGameCache;
  }

  updateGameCacheUponCompletion(feedback: FeedBack) {
    this.currentGameCache.isGameOver = {
      status: true,
      message: `${feedback.won ? 'You smart' : 'You stupid'}`,
    };
  }
}

export const gameCache = new GameCacheService();
