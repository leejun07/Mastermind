import request from 'supertest';
import express, { NextFunction, Request, Response } from 'express';
import gameController from '../../controllers/gameController';
import { GameCacheService } from '../../services/GameCacheService';
import gameManagementService, { GameManagementService } from '../../services/GameManagementService';

jest.mock('../../services/GameCacheService');
jest.mock('../../services/GameManagementService');

const mockedGameCacheService = GameCacheService as jest.MockedClass<typeof GameCacheService>;
const mockedGameManagementService = gameManagementService as jest.Mocked<
  typeof gameManagementService
>;

const app = express();
app.use(express.json());
app.post('/start', gameController.startGame, (req: Request, res: Response) => {
  res.status(200).send(res.locals.gameCache);
});
app.post('/play', gameController.playGame, (req: Request, res: Response) => {
  res.status(200).send(res.locals.gameData);
});

describe('Game Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should start a game successfully', async () => {
    const mockSolution = 'mocked-solution';
    const mockSolutionLength = 3;
    mockedGameManagementService.getInitialGameData.mockResolvedValue({
      solution: mockSolution,
      solutionLength: mockSolutionLength,
    });
    mockedGameCacheService.prototype.initializeGameCache.mockReturnValue({
      difficultyLevel: 'Normal',
      solution: '522',
      currentGuessCount: 10,
      guessHistory: [],
      feedbackHistory: [],
      isGameOver: {
        status: false,
        message: '',
      },
    });

    const response = await request(app)
      .post('/start')
      .send({ difficultyLevel: 'Easy' })
      .expect(200);

    expect(mockedGameManagementService.getInitialGameData).toHaveBeenCalledWith('Easy');
    expect(mockedGameCacheService.prototype.initializeGameCache).toHaveBeenCalledWith(
      mockSolution,
      'Easy'
    );
    expect(response.body).toEqual({
      difficultyLevel: 'Normal',
      solution: '522',
      currentGuessCount: 10,
      guessHistory: [],
      feedbackHistory: [],
      isGameOver: {
        status: false,
        message: '',
      },
    });
  });
});
