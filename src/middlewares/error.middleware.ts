import { Request, Response, NextFunction } from 'express';

export default function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode: number = err.statusCode || 500;

  console.error(`Error middleware: ${err.message}, ${err.stack}`);

  res.status(statusCode).json({ message: err.message });

  return;
}
