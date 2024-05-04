import request from 'supertest';
import express from 'express';
import router from '../../routes/gameRoutes';
import test from 'node:test';

const app = express();
app.use(express.json());
app.use('/', router);

const testGameStart = async (difficultyLevel: string, expectedSolutionLength: number) => {
  const response = await request(app)
    .post('/start')
    .send({
      difficultyLevel,
    })
    .expect(200);

  expect(response.body).toHaveProperty('difficultyLevel');
  expect(response.body).toHaveProperty('solution');
  expect(response.body).toHaveProperty('currentGuessCount');
  expect(response.body).toHaveProperty('guessHistory');
  expect(response.body).toHaveProperty('feedbackHistory');
  expect(response.body).toHaveProperty('isGameOver');
  expect(response.body.solution).toHaveLength(expectedSolutionLength);
};

describe('Game Routes', () => {
  it('starts a game successfully for Easy difficultyLevel', async () => {
    await testGameStart('Easy', 3);
  });

  it('starts a game successfully for Normal difficultyLevel', async () => {
    await testGameStart('Normal', 4);
  });

  it('starts a game successfully for Hard difficultyLevel', async () => {
    await testGameStart('Hard', 5);
  });
});
