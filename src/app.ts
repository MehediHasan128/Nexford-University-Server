import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRouter } from './app/modules/user/user.router';


const app : Application = express();

// Perser
app.use(express.json());
app.use(cors());


// application routes
app.use('/api/v1/users', UserRouter)

app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!');
})

export default app;