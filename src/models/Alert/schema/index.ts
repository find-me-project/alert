import { model, Schema } from 'mongoose';
import { AlertTypeEnum, LocationPointType, LocationTypeEnum } from '..';

export const ALERT = 'Alert';

const schema = new Schema({
  _id: String,
  type: AlertTypeEnum,
  data: {
    name: String,
    birthDate: Date,
    disappearDate: Date,
    isPcd: Boolean,
  },
  additionalInfo: String,
  location: {
    type: LocationTypeEnum.POINT,
    coordinates: [Number],
  },
  account: { type: String, ref: 'Account' },
}, {
  timestamps: true,
});

export const AlertModel = model<LocationPointType>(ALERT, schema);
