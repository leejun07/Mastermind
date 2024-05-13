import { GameLogicCache } from '../types/types';
import { fetchRandomNumbers } from '../utils/fetchRandomNumbers';
import { getSolutionLength } from '../utils/getSolutionLength';

/**
 * Service for managing game logic and data.
 */
export class GameManagementService {
  /**
   * Retrieves initial game data based on the selected difficulty level.
   * Input: difficultyLevel - The selected difficulty level.
   * Output: Object containing the solution and its length.
   */
  async getInitialGameData(difficultyLevel: string) {
    const solutionLength = getSolutionLength(difficultyLevel);
    const solution = await this.getRandomSolution(solutionLength);
    return { solution, solutionLength };
  }

  /**
   * Generates feedback based on the user's guess and the solution.
   * Inputs: Guess, solution.
   * Output: Feedback object.
   */
  getFeedback(guess: string, solution: string) {
    const feedback = {
      response: '',
      won: false,
    };
    const { exactMatch, match } = this.checkGuess(guess, solution);

    if (exactMatch === 0 && match === 0) {
      feedback.response = 'all incorrect';
    } else {
      feedback.response = `${match} correct number and ${exactMatch} correct location`;
    }
    if (exactMatch === solution.length) {
      feedback.won = true;
    }

    return feedback;
  }

  /**
   * Checks the guess against the solution and calculates exact matches and matches.
   * Inputs: Guess, solution.
   * Output: Object containing exact match and match counts.
   */
  checkGuess(guess: string, solution: string) {
    // Initialize variables to count exact matches and matches
    let exactMatch = 0;
    let match = 0;

    // Map to store occurrences of each digit in the solution
    const solutionMap: GameLogicCache = {};
    for (let char of solution) {
      if (solutionMap[char]) {
        solutionMap[char] += 1;
      } else {
        solutionMap[char] = 1;
      }
    }

    // Map to store occurrences of each digit in the guess
    const guessMap: GameLogicCache = {};
    for (let char of guess) {
      if (guessMap[char]) {
        guessMap[char] += 1;
      } else {
        guessMap[char] = 1;
      }
    }

    // Check for exact matches
    for (let i = 0; i < solution.length; i++) {
      if (guess[i] === solution[i]) {
        exactMatch += 1;
        match += 1;
        solutionMap[guess[i]] -= 1;
        guessMap[guess[i]] -= 1;
      }
    }

    // Check for matches (correct digits but not in the correct position)
    for (let i = 0; i < solution.length; i++) {
      // Checks if current element of guess is part of the solution and that the current element has not been completely matched yet
      if (solutionMap[guess[i]] > 0 && guessMap[guess[i]] !== 0) {
        match += 1;
        solutionMap[guess[i]] -= 1;
        guessMap[guess[i]] -= 1;
      }
    }

    // Return an object containing the counts of exact matches and matches
    return { exactMatch, match };
  }

  /**
   * Parses raw number sequence into a processed solution string.
   * Input: rawRandomNumberSequence - Raw number sequence from the random number API.
   * Output: Processed solution string.
   */
  parseRawNumberSequence(rawRandomNumberSequence: string) {
    const processedRawNumberSequence = rawRandomNumberSequence.split('\n').join('');
    return processedRawNumberSequence;
  }

  /**
   * Retrieves a random solution of the specified length.
   * Input: solutionLength - The length of the solution.
   * Output: Processed random solution string.
   */
  async getRandomSolution(solutionLength: number) {
    const rawRandomNumberSequence = await fetchRandomNumbers(solutionLength);
    const processedSolution = this.parseRawNumberSequence(rawRandomNumberSequence);
    return processedSolution;
  }
}

export const gameManagementService = new GameManagementService();
