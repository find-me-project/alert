import { Request, Response } from 'express';
import { ClientSession } from 'mongoose';
import { AlertService } from 'src/services';
import parameterValidation from './parameter-validation';

async function method (request: Request, response: Response, session?: ClientSession): Promise<Response> {
  const {
    latitude,
    longitude,
  } = request.query;

  const service = new AlertService(session);
  const result = await service.getNearbyAlerts([longitude as unknown as number, latitude as unknown as number]);

  return response.success({
    list: result,
  });
}

export default {
  validation: parameterValidation,
  method: method,
};
