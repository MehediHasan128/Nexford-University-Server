import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.router';
const app : Application = express();

// Perser
app.use(express.json());
app.use(cors());


// application routes
app.use('/api/v1/students', StudentRoutes)

app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!');
})

export default app;