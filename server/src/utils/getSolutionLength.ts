export const getSolutionLength = (difficultyLevel: string): number => {
  const difficultyLevels: { [key: string]: number } = {
    Easy: 3,
    Normal: 4,
    Hard: 5,
  };
  return difficultyLevels[difficultyLevel];
};
