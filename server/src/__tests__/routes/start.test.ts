import request from 'supertest';
import express from 'express';
import router from '../../routes/start';

const app = express();
app.use(express.json());
app.use('/', router);

describe('Game Routes', () => {
  it('starts a game successfully', async () => {
    const response = await request(app)
      .post('/start')
      .send({
        difficultyLevel: 'Easy',
      })
      .expect(200);

    expect(response.body).toHaveProperty('difficultyLevel');
    expect(response.body).toHaveProperty('solution');
    expect(response.body).toHaveProperty('currentGuessCount');
    expect(response.body).toHaveProperty('guessHistory');
    expect(response.body).toHaveProperty('feedbackHistory');
    expect(response.body).toHaveProperty('isGameOver');
  });

  it('plays the game successfully', async () => {
    const response = await request(app)
      .post('/play')
      .send({
        guess: '2052',
        difficultyLevel: 'Normal',
      })
      .expect(200);

    expect(response.body).toHaveProperty('currentCache');
    expect(response.body).toHaveProperty('currentGuess');
    expect(response.body).toHaveProperty('feedback');
  });
});
