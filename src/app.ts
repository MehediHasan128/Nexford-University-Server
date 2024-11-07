/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlwares/globalErrorHandler';
import notFound from './app/middlwares/notFound';
import router from './app/routes';

const app: Application = express();

// Perser
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// application routes
app.use('/api/v1', router);

// Use middlwares
app.use(
  globalErrorHandler as (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void,
);
app.use(notFound as (req: Request, res: Response, next: NextFunction) => void);

export default app;
