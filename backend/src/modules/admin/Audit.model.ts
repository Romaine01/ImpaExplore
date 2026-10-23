import mongoose, { Schema } from 'mongoose';

const options = { timestamps: true };
export const Audit = mongoose.model('Audit', new Schema({ actorId: Schema.Types.ObjectId, action: String, entityId: Schema.Types.ObjectId }, options));
Audit.schema.index({ createdAt: -1 });
