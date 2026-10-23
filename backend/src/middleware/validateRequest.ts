import type { RequestHandler } from 'express';
import type { z } from 'zod';

export const validateRequest = (schema: z.ZodType): RequestHandler => (req, _res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
