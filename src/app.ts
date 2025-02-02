import express, { Application } from 'express';
import logRequest from './middlewares/logger.middleware';
import errorMiddleware from './middlewares/error.middleware';
import ReceiptDatabase from '@models/receipts.model';
import BaseController from '@controllers/controller';

export default class App {
  public app: Application;
  public port: number;

  constructor(controllers: BaseController[], port: number) {
    this.app = express();
    this.port = port;

    this.initializeApp(controllers);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  private initializeApp(controllers: BaseController[]) {
    this.app.use(express.json());

    ReceiptDatabase.getInstance();

    this.app.use(logRequest);

    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });

    this.app.use(errorMiddleware);
  }
}
