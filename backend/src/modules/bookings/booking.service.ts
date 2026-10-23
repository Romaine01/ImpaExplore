import type { z } from 'zod';
import { failure } from '../../middleware/http.js';
import { Availability } from '../availability/Availability.model.js';
import { Destination } from '../destinations/Destination.model.js';
import { Guide } from '../guides/Guide.model.js';
import { Package } from '../packages/Package.model.js';
import { Booking } from './Booking.model.js';
import { canTransition, serviceDay } from './booking.rules.js';
import type { bookingInput, responseInput } from './booking.schema.js';

export async function requestBooking(touristId: string, input: z.infer<typeof bookingInput>) {
  const [guide, destination] = await Promise.all([Guide.findById(input.guideId), Destination.findById(input.destinationId)]);
  if (!guide || guide.get('status') !== 'published' || !destination || destination.get('status') !== 'published') {
    throw failure(422, 'Guide or destination unavailable');
  }
  if (input.packageId) {
    const selected = await Package.findOne({ _id: input.packageId, guideId: guide.id, destinationId: destination.id, status: 'published' });
    if (!selected || input.partySize > Number(selected.get('capacityMax'))) throw failure(422, 'Package unavailable for this group');
  }
  const start = new Date(input.requestedStartAt);
  if (start.getTime() <= Date.now()) throw failure(422, 'Choose a future time');
  const day = serviceDay(start);
  if (await Availability.exists({ guideId: guide.id, blockedDays: day })) throw failure(422, 'Guide is unavailable on this day');
  return Booking.findOneAndUpdate(
    { touristId, requestKey: input.requestKey },
    { $setOnInsert: { ...input, touristId, requestedStartAt: start, serviceDay: day, status: 'PENDING' } },
    { new: true, upsert: true },
  );
}

export const listOwnBookings = (touristId: string) =>
  Booking.find({ touristId }).sort({ createdAt: -1 }).limit(50).lean();

export async function getBooking(userId: string, id: string) {
  const booking = await Booking.findById(id);
  if (!booking) throw failure(404, 'Not found');
  const guide = await Guide.findById(booking.get('guideId'));
  if (String(booking.get('touristId')) !== userId && String(guide?.get('userId')) !== userId) throw failure(404, 'Not found');
  return booking;
}

export async function cancelBooking(touristId: string, id: string) {
  const booking = await Booking.findOne({ _id: id, touristId });
  if (!booking) throw failure(404, 'Not found');
  const previous = String(booking.get('status'));
  if (!canTransition(previous, 'CANCELLED', 'tourist')) throw failure(422, 'Request cannot be cancelled');
  const updated = await Booking.findOneAndUpdate(
    { _id: booking.id, status: previous },
    { $set: { status: 'CANCELLED' }, $push: { history: { from: previous, to: 'CANCELLED', actorId: touristId, at: new Date() } } },
    { new: true },
  );
  if (!updated) throw failure(409, 'Request changed');
  return updated;
}

export async function listGuideBookings(userId: string) {
  const guide = await Guide.findOne({ userId });
  return guide ? Booking.find({ guideId: guide.id }).sort({ createdAt: -1 }).limit(50).lean() : [];
}

export async function respondToBooking(userId: string, id: string, input: z.infer<typeof responseInput>) {
  const guide = await Guide.findOne({ userId, status: 'published' });
  if (!guide) throw failure(403, 'Guide is unavailable');
  const booking = await Booking.findOne({ _id: id, guideId: guide.id, status: 'PENDING' });
  if (!booking) throw failure(404, 'Pending request not found');
  if (!canTransition('PENDING', input.status, 'guide')) throw failure(422, 'Invalid status');
  if (input.status === 'CONFIRMED') {
    if (await Availability.exists({ guideId: guide.id, blockedDays: booking.get('serviceDay') })) throw failure(409, 'Guide is unavailable on this day');
    if (booking.get('packageId')) {
      const selected = await Package.findOne({ _id: booking.get('packageId'), guideId: guide.id, status: 'published' });
      if (!selected || Number(booking.get('partySize')) > Number(selected.get('capacityMax'))) throw failure(409, 'Package is no longer available');
    }
  }
  const updated = await Booking.findOneAndUpdate(
    { _id: booking.id, status: 'PENDING' },
    { $set: { status: input.status }, $push: { history: { from: 'PENDING', to: input.status, actorId: userId, at: new Date() } } },
    { new: true },
  );
  if (!updated) throw failure(409, 'Request already handled');
  return updated;
}
