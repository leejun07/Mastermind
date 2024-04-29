import { initialGameData } from '../configs/initialGameData';
import { GameCache } from '../types/types';

export class GameCacheService {
  currentGameCache: GameCache = initialGameData;

  initializeGameCache(solution: string): GameCache {
    this.currentGameCache = {
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

  updateGameCacheUponCompletion(feedback: any) {
    this.currentGameCache.isGameOver = {
      status: true,
      message: `${feedback.won ? 'You are a mastermind.' : 'You suck.'}`,
    };
  }
}
