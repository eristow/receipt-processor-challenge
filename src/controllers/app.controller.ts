import { Request, Response, NextFunction } from 'express';

export async function appGet(req: Request, res: Response, next: NextFunction) {
  try {
    res.send('Root endpoint');
  } catch (err) {
    console.error(`Error while getting root: ${err}`);
    next(err);
  }
}

export default {
  appGet,
};
