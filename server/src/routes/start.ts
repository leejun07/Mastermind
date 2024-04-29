import exp from 'constants';
import express, { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import gameController from '../controllers/gameController';

const router = express.Router();

router.post('/start', gameController.startGame, (req, res) => {
  res.status(200).send(res.locals.gameCache);
});

router.post('/play', gameController.playGame, (req, res) => {
  res.status(200).send(res.locals.gameData);
});

export default router;
