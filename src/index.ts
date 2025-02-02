import dotenv from 'dotenv';
import App from './app';
import AppController from '@controllers/app.controller';
import ReceiptsController from '@controllers/receipts.controller';

dotenv.config();

const app = new App(
  [new AppController(), new ReceiptsController()],
  Number(process.env.PORT) || 3000
);

app.listen();
