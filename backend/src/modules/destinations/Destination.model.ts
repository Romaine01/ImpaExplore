import mongoose, { Schema } from 'mongoose';

const options = { timestamps: true };
export const Destination = mongoose.model('Destination', new Schema({ name: { type: String, required: true }, slug: { type: String, required: true, unique: true }, category: String, summary: String, description: String, barangay: String, status: { type: String, default: 'draft' }, demo: { type: Boolean, default: false } }, options));
