import mongoose from 'mongoose';
import { env } from '../config/env.js';

export function connectDatabase() {
  return mongoose.connect(env.MONGODB_URI);
}
