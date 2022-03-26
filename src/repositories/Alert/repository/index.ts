import { ClientSession } from 'mongoose';
import { AlertStatusEnum, AlertType, LocationTypeEnum } from 'src/models/Alert';
import { AlertModel } from 'src/models/Alert/schema';
import IAlertRepository from '..';

export class AlertRepository implements IAlertRepository {
  private session?: ClientSession;

  constructor (session?: ClientSession) {
    this.session = session;
  }

  async create (alert: AlertType): Promise<AlertType> {
    const result = new AlertModel(alert);
    await result.save({ session: this.session });

    const item = result.toJSON();

    return item;
  }

  static async countActiveAlerts (accountId: string): Promise<number> {
    const result = await AlertModel.countDocuments({
      account: accountId,
      status: AlertStatusEnum.ACTIVE,
    });

    return result;
  }

  async getNearbyAlerts (coordinates: number[]): Promise<AlertType[] | null> {
    const result = await AlertModel.find(
      {
        location: {
          $near: {
            $geometry: { type: LocationTypeEnum.POINT, coordinates: coordinates },
            $minDistance: 0,
            $maxDistance: 5000,
          },
        },
      },
      undefined,
      {
        session: this.session,
      },
    )
      .limit(100)
      .exec();

    return result;
  }
}
