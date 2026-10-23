import { z } from 'zod';

const objectId = z.string().regex(/^[a-f\d]{24}$/i);
export const bookingInput = z.object({
  guideId: objectId,
  destinationId: objectId,
  packageId: objectId.optional(),
  requestedStartAt: z.iso.datetime(),
  partySize: z.number().int().min(1).max(30),
  notes: z.string().max(500).optional(),
  requestKey: z.uuid(),
});
export const responseInput = z.object({ status: z.enum(['CONFIRMED', 'DECLINED']) });
