import { Router } from 'express';

export default abstract class BaseController {
  public path: string = '';
  public router: Router = Router();

  constructor() {}

  protected abstract initializeRoutes(): void;
}
