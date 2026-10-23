import { z } from 'zod';

export const availabilityInput = z.object({ blockedDays: z.array(z.iso.date()).max(365) });
