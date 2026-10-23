import { z } from 'zod';
export const packageInput = z.object({ title: z.string().min(3).max(120), description: z.string().min(20).max(3000), destinationId: z.string().regex(/^[a-f\d]{24}$/i), capacityMax: z.number().int().min(1).max(30), priceAmount: z.number().min(0).optional() });
