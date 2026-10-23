import mongoose, { Schema } from 'mongoose';

const options = { timestamps: true };
export const Package = mongoose.model('Package', new Schema({ guideId: { type: Schema.Types.ObjectId, ref: 'Guide', required: true }, destinationId: { type: Schema.Types.ObjectId, ref: 'Destination', required: true }, slug: { type: String, required: true, unique: true }, title: String, description: String, capacityMax: Number, priceAmount: Number, status: { type: String, default: 'draft' }, demo: { type: Boolean, default: false } }, options));
