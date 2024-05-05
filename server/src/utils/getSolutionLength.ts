/**
 * Determines the length of the solution based on the selected difficulty level.
 * Input: difficultyLevel
 * Output: The length of the solution corresponding to the difficulty level.
 */
export const getSolutionLength = (difficultyLevel: string): number => {
  // Define the mapping of difficulty levels to solution lengths
  const difficultyLevels: { [key: string]: number } = {
    Easy: 3,
    Normal: 4,
    Hard: 5,
  };
  return difficultyLevels[difficultyLevel];
};
