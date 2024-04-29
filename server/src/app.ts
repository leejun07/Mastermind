import bodyParser from 'body-parser';
import express from 'express';
import startRouter from './routes/start';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/game', startRouter);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // Log it
  console.error(err);
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

export default app;
