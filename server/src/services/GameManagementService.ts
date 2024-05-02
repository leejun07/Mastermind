import { fetchRandomNumbers } from '../utils/fetchRandomNumbers';
import { getSolutionLength } from '../utils/getSolutionLength';

export class GameManagementService {
  async getInitialGameData(difficultyLevel: string) {
    const solutionLength = getSolutionLength(difficultyLevel);
    const solution = await this.getRandomSolution(solutionLength);
    return { solution, solutionLength };
  }

  getFeedback(guess: string, solution: string) {
    const feedback = {
      response: '',
      won: false,
    };
    const { exactMatch, match } = this.checkGuess(guess, solution);

    if (exactMatch === solution.length) {
      feedback.response = 'Winner!!';
      feedback.won = true;
    } else {
      feedback.response = `${match} correct number and ${exactMatch} correct location”`;
    }
    return feedback;
  }

  checkGuess(guess: string, solution: string) {
    let exactMatch = 0;
    let match = 0;
    const solutionMap: any = {};
    for (let char of solution) {
      if (solutionMap[char]) {
        solutionMap[char] += 1;
      } else {
        solutionMap[char] = 1;
      }
    }

    const guessMap: any = {};
    for (let char of guess) {
      if (guessMap[char]) {
        guessMap[char] += 1;
      } else {
        guessMap[char] = 1;
      }
    }

    for (let i = 0; i < solution.length; i++) {
      if (guess[i] === solution[i]) {
        exactMatch += 1;
        match += 1;
        solutionMap[guess[i]] -= 1;
        guessMap[guess[i]] -= 1;
      }
    }

    for (let i = 0; i < solution.length; i++) {
      if (solutionMap[guess[i]] > 0 && guessMap[guess[i]] !== 0) {
        match += 1;
        solutionMap[guess[i]] -= 1;
        guessMap[guess[i]] -= 1;
      }
    }

    return { exactMatch, match };
  }

  parseRawNumberSequence(rawRandomNumberSequence: any) {
    const processedRawNumberSequence = rawRandomNumberSequence.split('\n').join('');
    return processedRawNumberSequence;
  }

  async getRandomSolution(solutionLength: number) {
    const rawRandomNumberSequence = await fetchRandomNumbers(solutionLength);
    const processedSolution = this.parseRawNumberSequence(rawRandomNumberSequence);
    return processedSolution;
  }
}

const gameManagementService = new GameManagementService();
export default gameManagementService;
