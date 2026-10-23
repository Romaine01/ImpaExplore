import mongoose, { Schema } from 'mongoose';

const options = { timestamps: true };
export const Booking = mongoose.model('Booking', new Schema({ touristId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, guideId: { type: Schema.Types.ObjectId, ref: 'Guide', required: true }, destinationId: { type: Schema.Types.ObjectId, ref: 'Destination', required: true }, packageId: { type: Schema.Types.ObjectId, ref: 'Package' }, requestedStartAt: { type: Date, required: true }, serviceDay: { type: String, required: true }, partySize: { type: Number, required: true }, notes: String, status: { type: String, default: 'PENDING' }, history: [{ from: String, to: String, actorId: Schema.Types.ObjectId, at: Date }], requestKey: { type: String, required: true } }, options));
Booking.schema.index({ touristId: 1, requestKey: 1 }, { unique: true });
Booking.schema.index({ guideId: 1, requestedStartAt: 1, status: 1 });
Booking.schema.index({ guideId: 1, serviceDay: 1 }, { unique: true, partialFilterExpression: { status: 'CONFIRMED' } });
