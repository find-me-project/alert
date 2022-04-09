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

  static async countActiveAlerts (accountId: string, type: string): Promise<number> {
    const result = await AlertModel.countDocuments({
      account: accountId,
      status: AlertStatusEnum.active,
      type: type,
    });

    return result;
  }

  async getNearbyAlerts (coordinates: number[], type?: string): Promise<AlertType[] | null> {
    let filter: Record<string, any> = {
      location: {
        $near: {
          $geometry: { type: LocationTypeEnum.point, coordinates: coordinates },
          $minDistance: 0,
          $maxDistance: 5000,
        },
      },
    };

    if (type) {
      filter = {
        ...filter,
        type: {
          $eq: type,
        },
      };
    }

    const result = await AlertModel.find(
      filter,
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
