import request from 'supertest';
import express, { NextFunction, Request, Response } from 'express';
import gameController from '../../controllers/gameController';
import { GameCacheService } from '../../services/GameCacheService';
import { gameManagementService } from '../../services/GameManagementService';
import { difficultyLevels } from '../../configs/difficultySettings';

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

  it('should start a game on Easy difficultyLevel successfully', async () => {
    const mockSolution = 'mocked-solution';
    const mockSolutionLength = difficultyLevels['Easy'];
    mockedGameManagementService.getInitialGameData.mockResolvedValue({
      solution: mockSolution,
      solutionLength: mockSolutionLength,
    });
    const mockedResponse = {
      difficultyLevel: 'Easy',
      solution: '522',
      currentGuessCount: 10,
      guessHistory: [],
      feedbackHistory: [],
      isGameOver: {
        status: false,
        message: '',
      },
    };
    mockedGameCacheService.prototype.initializeGameCache.mockReturnValue(mockedResponse);

    const response = await request(app)
      .post('/start')
      .send({ difficultyLevel: 'Easy' })
      .expect(200);

    expect(mockedGameManagementService.getInitialGameData).toHaveBeenCalledWith('Easy');
    expect(mockedGameCacheService.prototype.initializeGameCache).toHaveBeenCalledWith(
      mockSolution,
      'Easy'
    );
    expect(response.body).toEqual(mockedResponse);
  });

  it('should start a game on Normal difficultyLevel successfully', async () => {
    const mockSolution = 'mocked-solution';
    const mockSolutionLength = difficultyLevels['Normal'];
    mockedGameManagementService.getInitialGameData.mockResolvedValue({
      solution: mockSolution,
      solutionLength: mockSolutionLength,
    });
    const mockedResponse = {
      difficultyLevel: 'Normal',
      solution: '5222',
      currentGuessCount: 10,
      guessHistory: [],
      feedbackHistory: [],
      isGameOver: {
        status: false,
        message: '',
      },
    };
    mockedGameCacheService.prototype.initializeGameCache.mockReturnValue(mockedResponse);

    const response = await request(app)
      .post('/start')
      .send({ difficultyLevel: 'Normal' })
      .expect(200);

    expect(mockedGameManagementService.getInitialGameData).toHaveBeenCalledWith('Normal');
    expect(mockedGameCacheService.prototype.initializeGameCache).toHaveBeenCalledWith(
      mockSolution,
      'Normal'
    );
    expect(response.body).toEqual(mockedResponse);
  });

  it('should start a game on Hard difficultyLevel successfully', async () => {
    const mockSolution = 'mocked-solution';
    const mockSolutionLength = difficultyLevels['Hard'];
    mockedGameManagementService.getInitialGameData.mockResolvedValue({
      solution: mockSolution,
      solutionLength: mockSolutionLength,
    });
    const mockedResponse = {
      difficultyLevel: 'Hard',
      solution: '52244',
      currentGuessCount: 10,
      guessHistory: [],
      feedbackHistory: [],
      isGameOver: {
        status: false,
        message: '',
      },
    };
    mockedGameCacheService.prototype.initializeGameCache.mockReturnValue(mockedResponse);

    const response = await request(app)
      .post('/start')
      .send({ difficultyLevel: 'Hard' })
      .expect(200);

    expect(mockedGameManagementService.getInitialGameData).toHaveBeenCalledWith('Hard');
    expect(mockedGameCacheService.prototype.initializeGameCache).toHaveBeenCalledWith(
      mockSolution,
      'Hard'
    );
    expect(response.body).toEqual(mockedResponse);
  });
});
