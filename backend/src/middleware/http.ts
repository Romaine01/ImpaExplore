import type { NextFunction, Request, Response } from 'express';

export const wrap = (fn: (req: Request, res: Response) => Promise<unknown>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res)).catch(next);
  };

export const failure = (status: number, message: string) =>
  Object.assign(new Error(message), { status });

export const data = (res: Response, value: unknown, status = 200) =>
  res.status(status).json({ data: value });
