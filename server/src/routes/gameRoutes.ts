import express from 'express';
import gameController from '../controllers/gameController';

const router = express.Router();

/**
 * Route for starting a new game.
 */
router.post('/start', gameController.startGame, (req, res) => {
  res.status(200).send(res.locals.gameCache);
});

/**
 * Route for playing the game.
 */
router.post('/play', gameController.playGame, (req, res) => {
  res.status(200).send(res.locals.gameData);
});

export default router;
