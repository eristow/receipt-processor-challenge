import { NextFunction, Request, Response } from 'express';

export default function logRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.path == '/health') {
    next();
    return;
  }

  const reqTime = new Date(Date.now()).toString();

  console.log(
    `req: ${reqTime} | ${req.method} | ${req.hostname} | ${req.path}`
  );
  console.log(`req body: ${JSON.stringify(req.body)}`);

  next();
}
