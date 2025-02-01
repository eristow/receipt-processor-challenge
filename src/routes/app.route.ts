import { Router } from 'express';
import appController from '@controllers/app.controller';

const appRouter = Router();

appRouter.get('/', appController.appGet);

export default appRouter;
