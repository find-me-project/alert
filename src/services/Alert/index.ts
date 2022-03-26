import IAlertRepository from 'src/repositories/Alert';
import { ClientSession } from 'mongoose';
import { AlertType } from 'src/models/Alert';
import makeAlert from 'src/models/Alert/model';
import ValidationError from 'src/util/error/validation-error';
import { AlertRepository } from '../../repositories';

export class AlertService {
  private repository: IAlertRepository;

  constructor (session?: ClientSession) {
    this.repository = new AlertRepository(session);
  }

  static async canCreate (data: AlertType): Promise<boolean> {
    const count = await AlertRepository.countActiveAlerts(data.account);

    if (count > 3) {
      throw new ValidationError('MAX_ACCOUNT_ALERTS');
    }

    return true;
  }

  async create (data: AlertType): Promise<AlertType> {
    await AlertService.canCreate(data);

    const alert = makeAlert(data);
    const result = await this.repository.create(alert);

    return result;
  }

  async getNearbyAlerts (coordinates: number[]): Promise<AlertType[] | null> {
    const longitude = coordinates[0];
    const latitude = coordinates[1];

    if (longitude > 180 || longitude < -180 || latitude > 90 || latitude < -90) {
      throw new ValidationError('LOCATION_INVALID');
    }

    const result = await this.repository.getNearbyAlerts(coordinates);

    return result;
  }
}
