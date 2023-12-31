import express, { json } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { homeRouter } from './routers/home.router';
import { streamersRouter } from './routers/streamers.router';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(json());

// ROUTERS

app.use('/', homeRouter);
app.use('/streamers', streamersRouter);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port https://localhost:3001')
})