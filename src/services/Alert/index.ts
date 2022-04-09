import IAlertRepository from 'src/repositories/Alert';
import { ClientSession } from 'mongoose';
import { AlertType, AlertTypeEnum } from 'src/models/Alert';
import makeAlert from 'src/models/Alert/model';
import ValidationError from 'src/util/error/validation-error';
import { AlertRepository } from '../../repositories';

export class AlertService {
  private repository: IAlertRepository;

  constructor (session?: ClientSession) {
    this.repository = new AlertRepository(session);
  }

  static async canCreate (data: AlertType): Promise<boolean> {
    const count = await AlertRepository.countActiveAlerts(data.account, data.type);

    if (data.type === AlertTypeEnum.person && count > 3) {
      throw new ValidationError('MAX_ACCOUNT_ALERTS');
    } else if (data.type === AlertTypeEnum.pet && count > 5) {
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

  async getNearbyAlerts (coordinates: number[], type?: string): Promise<AlertType[] | null> {
    const latitude = coordinates[0];
    const longitude = coordinates[1];

    if (longitude > 180 || longitude < -180 || latitude > 90 || latitude < -90) {
      throw new ValidationError('LOCATION_INVALID');
    }

    if (type && !(Object.values(AlertTypeEnum).includes(type as AlertTypeEnum))) {
      throw new ValidationError('TYPE_INVALID');
    }

    const result = await this.repository.getNearbyAlerts(coordinates, type);

    return result;
  }
}
