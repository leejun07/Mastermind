import { GameCache } from '../types/types';

export const initialGameData: GameCache = {
  currentGuessCount: 10,
  guessHistory: [],
  solution: '',
  feedbackHistory: [],
  isGameOver: {
    status: false,
    message: '',
  },
};
