import { query } from 'express-validator';
import getMessage from 'src/util/i18n/methods/get-message';

export default [
  query('latitude')
    .not().isEmpty()
    .withMessage(getMessage('LATITUDE_REQUIRED'))
    .isNumeric()
    .withMessage(getMessage('LATITUDE_INVALID'))
    .isFloat({
      min: -90,
      max: 90,
    })
    .withMessage(getMessage('LATITUDE_INVALID'))
    .toFloat(),
  query('longitude')
    .not().isEmpty()
    .withMessage(getMessage('LONGITUDE_REQUIRED'))
    .isNumeric()
    .withMessage(getMessage('LONGITUDE_INVALID'))
    .isFloat({
      min: -180,
      max: 180,
    })
    .withMessage(getMessage('LONGITUDE_INVALID'))
    .toFloat(),
  query('type')
    .optional()
    .isString()
    .withMessage(getMessage('TYPE_INVALID'))
    .trim()
    .escape(),
];
