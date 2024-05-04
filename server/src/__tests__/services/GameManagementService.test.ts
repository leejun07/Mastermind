import { difficultyLevels } from '../../configs/difficultySettings';
import { gameManagementService } from '../../services/GameManagementService';

const testInitialGameData = async (difficultyLevel: string, solutionLength: number) => {
  const initialGameData = await gameManagementService.getInitialGameData(difficultyLevel);
  expect(initialGameData.solution).toHaveLength(solutionLength);
  expect(initialGameData.solutionLength).toBe(solutionLength);
};

const testGetFeedback = (
  guess: string,
  solution: string,
  match: number,
  exactMatch: number,
  won: boolean
) => {
  const feedback = gameManagementService.getFeedback(guess, solution);
  expect(feedback.response).toBe(`${match} correct number and ${exactMatch} correct location`);
  expect(feedback.won).toBe(won);
};

const testCheckGuess = (
  guess: string,
  solution: string,
  correctMatch: number,
  correctExactMatch: number
) => {
  const { exactMatch, match } = gameManagementService.checkGuess(guess, solution);
  expect(exactMatch).toBe(correctMatch);
  expect(match).toBe(correctExactMatch);
};

describe('GameManagementService', () => {
  describe('getInitialGameData', () => {
    it('returns valid initial game data for easy difficulty', async () => {
      await testInitialGameData('Easy', 3);
    });
  });

  it('returns valid initial game data for normal difficulty', async () => {
    await testInitialGameData('Normal', 4);
  });

  it('returns valid initial game data for hard difficulty', async () => {
    await testInitialGameData('Hard', 5);
  });

  describe('getFeedback', () => {
    it('checks correctly for a correct guess for Easy difficultyLevel', () => {
      testGetFeedback('123', '123', 3, 3, true);
    });
    it('checks correctly for a completely incorrect guess for Easy difficultyLevel', () => {
      testGetFeedback('123', '456', 0, 0, false);
    });
    it('checks correctly for a partially correct guess for Easy difficultyLevel (A)', () => {
      testGetFeedback('111', '001', 1, 1, false);
    });
    it('checks correctly for a partially correct guess for Easy difficultyLevel (B)', () => {
      testGetFeedback('013', '016', 2, 2, false);
    });
    it('checks correctly for a correct guess for Normal difficultyLevel', () => {
      testGetFeedback('1234', '1234', 4, 4, true);
    });
    it('checks correctly for a completely incorrect guess for Normal difficultyLevel', () => {
      testGetFeedback('1232', '4567', 0, 0, false);
    });
    it('checks correctly for a partially correct guess for Normal difficultyLevel (A)', () => {
      testGetFeedback('1112', '0001', 1, 0, false);
    });
    it('checks correctly for a partially correct guess for Normal difficultyLevel (B)', () => {
      testGetFeedback('0135', '0156', 3, 2, false);
    });
    it('checks correctly for a correct guess for Hard difficultyLevel', () => {
      testGetFeedback('12345', '12345', 5, 5, true);
    });
    it('checks correctly for a completely incorrect guess for Hard difficultyLevel', () => {
      testGetFeedback('12321', '44567', 0, 0, false);
    });
    it('checks correctly for a partially correct guess for Hard difficultyLevel (A)', () => {
      testGetFeedback('01355', '02555', 3, 3, false);
    });
    it('checks correctly for a partially correct guess for Hard difficultyLevel (B)', () => {
      testGetFeedback('20330', '01355', 2, 1, false);
    });
  });
  describe('checkGuess', () => {
    test('returns correct matches and exact matches for all exactMatches for Easy difficultyLevel', () => {
      testCheckGuess('123', '123', 3, 3);
    });
    test('returns correct matches and exact matches for no matches for Easy difficultyLevel', () => {
      testCheckGuess('123', '456', 0, 0);
    });
    test('returns correct matches and exact matches for only matches for Easy difficultyLevel', () => {
      testCheckGuess('001', '110', 0, 2);
    });
    test('returns correct matches and exact matches for both exactMatches and matches for Easy difficultyLevel', () => {
      testCheckGuess('001', '010', 1, 3);
    });
    test('returns correct matches and exact matches for all exactMatches for Normal difficultyLevel', () => {
      testCheckGuess('1234', '1234', 4, 4);
    });
    test('returns correct matches and exact matches for no matches for Normal difficultyLevel', () => {
      testCheckGuess('1234', '5756', 0, 0);
    });
    test('returns correct matches and exact matches for only matches for Normal difficultyLevel', () => {
      testCheckGuess('0135', '1053', 0, 4);
    });
    test('returns correct matches and exact matches for both exactMatches and matches for Normal difficultyLevel', () => {
      testCheckGuess('1114', '1122', 2, 2);
    });
    test('returns correct matches and exact matches for all exactMatches for Hard difficultyLevel', () => {
      testCheckGuess('12345', '12345', 5, 5);
    });
    test('returns correct matches and exact matches for no matches for Hard difficultyLevel', () => {
      testCheckGuess('12342', '57566', 0, 0);
    });
    test('returns correct matches and exact matches for only matches for Hard difficultyLevel', () => {
      testCheckGuess('01356', '63510', 0, 5);
    });
    test('returns correct matches and exact matches for both exactMatches and matches for Hard difficultyLevel', () => {
      testCheckGuess('11147', '71122', 2, 3);
    });
  });
  describe('parseRawNumberSequence', () => {
    it('correctly parses RawNumberSequence', () => {
      const rawRandomNumberSequence = '1\n2\n3\n';
      const response = gameManagementService.parseRawNumberSequence(rawRandomNumberSequence);
      expect(response).toBe('123');
    });
  });
});
