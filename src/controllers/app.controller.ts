import { Router, Request, Response, NextFunction } from 'express';
import BaseController from '@controllers/controller';

export default class AppController extends BaseController {
  public path = '/';
  public router = Router();

  constructor() {
    super();
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.get(this.path, this.appGet.bind(this));
    this.router.get('/health', this.healthCheck.bind(this));
  }

  private appGet(req: Request, res: Response, next: NextFunction) {
    try {
      res.send('Welcome to the Receipt Processor App!');
    } catch (err) {
      console.error(`Error while getting root: ${err}`);
      next(err);
    }
  }

  private healthCheck(req: Request, res: Response, next: NextFunction) {
    try {
      res.send('Health Check');
    } catch (err) {
      console.error(`Error while getting root: ${err}`);
      next(err);
    }
  }
}
