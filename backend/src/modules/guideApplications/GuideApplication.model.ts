import mongoose, { Schema } from 'mongoose';

const options = { timestamps: true };
export const GuideApplication = mongoose.model('GuideApplication', new Schema({ userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true }, displayName: String, bio: String, specialties: [String], socialLinks: [{ platform: String, url: String }], status: { type: String, default: 'pending' }, reviewReason: String }, options));
