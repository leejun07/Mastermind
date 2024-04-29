import { fetchRandomNumbers } from '../utils/fetchRandomNumbers';

export class GameManagementService {
  async getInitialGameData() {
    const solution = await this.getRandomSolution();
    return { solution };
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
    const map: any = {};
    for (let char of solution) {
      if (map[char]) {
        map[char] += 1;
      } else {
        map[char] = 1;
      }
    }
    for (let i = 0; i < solution.length; i++) {
      if (guess[i] === solution[i]) {
        exactMatch += 1;
        match += 1;
        map[guess[i]] -= 1;
      }
    }

    for (let i = 0; i < solution.length; i++) {
      if (solution.includes(guess[i]) && map[guess[i]] > 0) {
        match += 1;
        map[guess[i]] -= 1;
      }
    }
    return { exactMatch, match };
  }

  parseRawNumberSequence(rawRandomNumberSequence: any) {
    const processedRawNumberSequence = rawRandomNumberSequence.split('\n').join('');
    return processedRawNumberSequence;
  }

  async getRandomSolution() {
    const rawRandomNumberSequence = await fetchRandomNumbers();
    const processedSolution = this.parseRawNumberSequence(rawRandomNumberSequence);
    return processedSolution;
  }
}

const gameManagementService = new GameManagementService();
export default gameManagementService;
