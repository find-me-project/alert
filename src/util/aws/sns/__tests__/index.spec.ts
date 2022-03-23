// import { faker } from '@faker-js/faker';
import {
  describe, it, expect,
} from '@jest/globals';
import ValidationError from '../../../error/validation-error';
import { SNSService } from '../..';

describe('sns service', () => {
  describe('constructor', () => {
    it('should create a sns service', () => {
      expect.assertions(1);

      const service = new SNSService();

      expect(service).toBeDefined();
    });

    it('should not create a sns service if invalid environment was provided', () => {
      expect.assertions(1);

      process.env = {};

      expect(
        () => new SNSService(),
      )
        .toThrow(new ValidationError('INTERNAL_ERROR_INVALID_ENV'));
    });
  });
});
