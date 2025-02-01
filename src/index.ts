import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import appRouter from '@routes/app.route';
import receiptsRouter from '@routes/receipts.route';
import errorMiddleware from './middlewares/error.middleware';
import { logRequest } from './middlewares/logger.middleware';
import ReceiptDatabase from '@models/receipts.model';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// TODO: Figure out how to have controllers access DB without passing it around everywhere.
ReceiptDatabase.getInstance();

app.use(logRequest);

app.use('/', appRouter);
app.use('/receipts', receiptsRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
