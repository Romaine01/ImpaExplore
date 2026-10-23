import mongoose, { Schema } from 'mongoose';

const options = { timestamps: true };
export const Guide = mongoose.model('Guide', new Schema({ userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true }, slug: { type: String, required: true, unique: true }, displayName: String, bio: String, specialties: [String], socialLinks: [{ platform: String, url: String }], status: { type: String, default: 'draft' }, demo: { type: Boolean, default: false } }, options));
