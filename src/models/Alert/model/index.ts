import { uuidValidateV4 } from 'src/util/uuid';
import ValidationError from 'src/util/error/validation-error';
import { differenceInYears, isFuture, isValid } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { AlertType, AlertTypeEnum, LocationTypeEnum } from '..';

export default function makeAlert (alert: AlertType): Readonly<AlertType> {
  if (alert._id && !uuidValidateV4(alert._id)) {
    throw new ValidationError('ID_INVALID');
  }

  if (!alert.type) {
    throw new ValidationError('ALERT_TYPE_REQUIRED');
  }

  if (!Object.values(AlertTypeEnum).includes(alert.type)) {
    throw new ValidationError('ALERT_TYPE_INVALID');
  }

  if (!alert.data) {
    throw new ValidationError('ALERT_DATA_REQUIRED');
  }

  if (!alert.data.name) {
    throw new ValidationError('NAME_REQUIRED');
  }

  if (alert.data.name.length < 3) {
    throw new ValidationError('NAME_MIN_LENGTH', { value: 3 });
  }
  if (alert.data.name.length > 30) {
    throw new ValidationError('NAME_MAX_LENGTH', { value: 30 });
  }
  if (!alert.data.name.match(/^([A-Z][a-z]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$/g)) {
    throw new ValidationError('NAME_INVALID');
  }

  if (!alert.data.birthDate) {
    throw new ValidationError('BIRTH_DATE_REQUIRED');
  }
  if (!(alert.data.birthDate instanceof Date)) {
    throw new ValidationError('BIRTH_DATE_INVALID');
  }
  if (!isValid(alert.data.birthDate)) {
    throw new ValidationError('BIRTH_DATE_INVALID');
  }

  if (!alert.data.disappearDate) {
    throw new ValidationError('DISAPPEAR_DATE_REQUIRED');
  }
  if (!(alert.data.disappearDate instanceof Date)) {
    throw new ValidationError('DISAPPEAR_DATE_INVALID');
  }
  if (!isValid(alert.data.disappearDate)) {
    throw new ValidationError('DISAPPEAR_DATE_INVALID');
  }

  const age = differenceInYears(new Date(), alert.data.birthDate);
  if (age < 1) {
    throw new ValidationError('BIRTH_DATE_MIN_DATE', { value: 1 });
  }
  if (age > 116) {
    throw new ValidationError('BIRTH_DATE_INVALID');
  }

  const disappearAge = differenceInYears(new Date(), alert.data.disappearDate);
  if (isFuture(disappearAge) || disappearAge > 116) {
    throw new ValidationError('DISAPPEAR_DATE_INVALID');
  }

  if (alert.additionalInfo && alert.additionalInfo.length > 300) {
    throw new ValidationError('ADDITIONAL_INFO_MAX_LENGTH', { value: 300 });
  }

  if (!alert.location || !alert.location.coordinates) {
    throw new ValidationError('LOCATION_REQUIRED');
  }

  if (alert.location.coordinates.length !== 2) {
    throw new ValidationError('LOCATION_INVALID');
  }

  const longitude = alert.location.coordinates[0];
  const latitude = alert.location.coordinates[1];
  if (longitude > 180 || longitude < -180 || latitude > 90 || latitude < -90) {
    throw new ValidationError('LOCATION_INVALID');
  }

  if (alert.data.isPcd !== undefined && typeof alert.data.isPcd !== 'boolean') {
    throw new ValidationError('PCD_INVALID');
  }

  if (!alert.account) {
    throw new ValidationError('ACCOUNT_ID_REQUIRED');
  }

  return Object.freeze({
    _id: alert._id || uuidv4(),
    type: alert.type,
    data: alert.data,
    additionalInfo: alert.additionalInfo,
    location: {
      type: LocationTypeEnum.POINT,
      coordinates: alert.location.coordinates,
    },
    account: alert.account,
  });
}
