import { AlertType } from 'src/models/Alert';

interface IAlertRepository {
  create (alert: AlertType): Promise<AlertType>,
  // countActiveAlerts (accountId: string): Promise<number>,
  getNearbyAlerts (coordinates: number[]): Promise<AlertType[] | null>
}

export default IAlertRepository;
