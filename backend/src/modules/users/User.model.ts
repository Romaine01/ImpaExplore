import mongoose, { Schema } from 'mongoose';
import { ROLE } from './roles.js';

const options = { timestamps: true };
export const User = mongoose.model('User', new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true, select: false },
  mfaSecret: { type: String, select: false },
  roles: { type: [String], default: [ROLE.tourist] },
  status: { type: String, enum: ['active', 'suspended'], default: 'active' },
}, options));
