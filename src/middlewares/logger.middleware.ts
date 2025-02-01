import { NextFunction, Request, Response } from 'express';

export function logRequest(req: Request, res: Response, next: NextFunction) {
  const reqTime = new Date(Date.now()).toString();

  console.log(
    `req: ${reqTime} | ${req.method} | ${req.hostname} | ${req.path}`
  );
  console.log(`req body: ${JSON.stringify(req.body)}`);

  next();
}
