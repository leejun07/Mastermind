import request from 'supertest';
import express from 'express';
import router from '../../routes/gameRoutes';
import { difficultyLevels } from '../../configs/difficultySettings';
import { beforeEach } from 'node:test';
import { initialGameData } from '../../configs/initialGameData';

const app = express();
app.use(express.json());
app.use('/', router);

const testGamePlay = async (guess: string, difficultyLevel: string) => {
  await request(app).post('/start').send({
    difficultyLevel,
  });
  const response = await request(app)
    .post('/play')
    .send({
      guess: guess,
      difficultyLevel,
    })
    .expect(200);

  const currentGuessCount = response.body.currentCache.currentGuessCount;
  const responseBody = response.body;
  const currentCache = responseBody.currentCache;

  expect(responseBody).toHaveProperty('currentCache');
  expect(responseBody).toHaveProperty('currentGuess');
  expect(responseBody).toHaveProperty('feedback');
  expect(responseBody.currentGuess).toHaveLength(difficultyLevels[difficultyLevel]);
  expect(currentCache.guessHistory).toHaveLength(10 - currentGuessCount);
  expect(currentCache.feedbackHistory).toHaveLength(10 - currentGuessCount);
};

describe('Game Routes', () => {
  it('plays the game successfully for Easy difficultyLevel', async () => {
    await testGamePlay('123', 'Easy');
  });
  it('plays the game successfully for Normal difficultyLevel', async () => {
    await testGamePlay('1234', 'Normal');
  });
  it('plays the game successfully for Hard difficultyLevel', async () => {
    await testGamePlay('12345', 'Hard');
  });
});
