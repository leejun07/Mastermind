import exp from 'constants';
import express, { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import gameController from '../controllers/gameController';
import { validateGuess } from '../middleware/validateGuess';
import { validateStartRequest } from '../middleware/validateStartRequest';

const router = express.Router();

router.post('/start', validateStartRequest, gameController.startGame, (req, res) => {
  res.status(200).send(res.locals.gameCache);
});

router.post('/play', validateGuess, gameController.playGame, (req, res) => {
  res.status(200).send(res.locals.gameData);
});

export default router;
