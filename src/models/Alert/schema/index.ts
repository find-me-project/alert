import { model, Schema } from 'mongoose';
import {
  AlertType,
} from '..';

export const ALERT = 'Alert';

const schema = new Schema({
  _id: String,
  type: String,
  data: {
    name: String,
    birthDate: Date,
    disappearDate: Date,
    isPcd: Boolean,
  },
  additionalInfo: String,
  location: {
    type: {
      type: String,
    },
    coordinates: [Number],
  },
  account: { type: String, ref: 'Account', index: true },
  status: String,
}, {
  timestamps: true,
});

schema.index({ location: '2dsphere' });

export const AlertModel = model<AlertType>(ALERT, schema);
