import mongoose, { Schema } from 'mongoose';

const options = { timestamps: true };
export const Availability = mongoose.model('Availability', new Schema({ guideId: { type: Schema.Types.ObjectId, ref: 'Guide', required: true, unique: true }, blockedDays: { type: [String], default: [] } }, options));
