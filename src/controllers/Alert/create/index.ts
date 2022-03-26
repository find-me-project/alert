import { Request, Response } from 'express';
import { ClientSession } from 'mongoose';
import { AlertService } from 'src/services';
import parameterValidation from './parameter-validation';

async function method (request: Request, response: Response, session?: ClientSession): Promise<Response> {
  const {
    accountId,
  } = request.accessData!;

  const {
    type,
    name,
    birthDate,
    disappearDate,
    isPcd,
    additionalInfo,
    latitude,
    longitude,
  } = request.body;

  const service = new AlertService(session);
  const result = await service.create({
    type: type,
    data: {
      name: name,
      birthDate: birthDate,
      disappearDate: disappearDate,
      isPcd: isPcd,
    },
    additionalInfo: additionalInfo,
    location: {
      coordinates: [latitude, longitude],
    },
    account: accountId!,
  });

  return response.successfulCreated({
    alert: result,
  }, 'SAVED');
}

export default {
  validation: parameterValidation,
  method: method,
};
