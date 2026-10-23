import type { ErrorRequestHandler } from 'express';
import { z } from 'zod';

export const errorHandler: ErrorRequestHandler = (err: unknown, _req, res, _next) => {
  if (err instanceof z.ZodError) {
    res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Please check the submitted fields', details: err.issues } });
    return;
  }
  if (typeof err === 'object' && err && 'code' in err && err.code === 11000) {
    res.status(409).json({ error: { code: 'CONFLICT', message: 'Booking or record conflict' } });
    return;
  }
  const status = typeof err === 'object' && err && 'status' in err ? Number(err.status) : 500;
  res.status(status).json({ error: { code: status === 500 ? 'SERVER_ERROR' : 'REQUEST_ERROR', message: status === 500 ? 'Unexpected server error' : (err as Error).message } });
};
