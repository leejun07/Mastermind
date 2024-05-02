export type GameCache = {
  currentGuessCount: number;
  guessHistory: string[];
  solution: string;
  difficultyLevel: string;
  feedbackHistory: string[];
  isGameOver: {};
};

export type GameLogicCache = {
  [key: string]: number;
};

export type FeedBack = {
  response: string;
  won: boolean;
};
