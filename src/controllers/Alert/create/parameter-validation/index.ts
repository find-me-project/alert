import { body } from 'express-validator';
import getMessage from 'src/util/i18n/methods/get-message';

export default [
  body('type')
    .not().isEmpty()
    .withMessage(getMessage('TYPE_REQUIRED'))
    .isString()
    .withMessage(getMessage('TYPE_INVALID'))
    .trim()
    .escape(),
  body('name')
    .not().isEmpty()
    .withMessage(getMessage('NAME_REQUIRED'))
    .trim()
    .escape(),
  body('birthDate')
    .not().isEmpty()
    .withMessage(getMessage('BIRTH_DATE_REQUIRED'))
    .isDate()
    .withMessage(getMessage('BIRTH_DATE_INVALID'))
    .toDate(),
  body('disappearDate')
    .not().isEmpty()
    .withMessage(getMessage('DISAPPEAR_DATE_REQUIRED'))
    .toDate()
    .withMessage(getMessage('DISAPPEAR_DATE_INVALID')),
  body('isPcd')
    .optional()
    .isBoolean()
    .withMessage(getMessage('IS_PCD_INVALID'))
    .toBoolean(),
  body('additionalInfo')
    .optional()
    .isString()
    .withMessage(getMessage('ADDITIONAL_INFO_INVALID'))
    .escape(),
  body('latitude')
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
  body('longitude')
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
];
