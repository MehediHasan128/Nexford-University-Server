/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { UserRouter } from './app/modules/user/user.router';
import globalErrorHandler from './app/middlwares/globalErrorHandler';


const app : Application = express();

// Perser
app.use(express.json());
app.use(cors());

app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!');
})

// application routes
app.use('/api/v1/users', UserRouter)

// Use middlwares
app.use(globalErrorHandler as (err: any, req: Request, res: Response, next: NextFunction) => void)

export default app;