import { AlertType } from 'src/models/Alert';

interface IAlertRepository {
  create (alert: AlertType): Promise<AlertType>,
  // countActiveAlerts (accountId: string): Promise<number>,
  getNearbyAlerts (coordinates: number[], type?: string): Promise<AlertType[] | null>
}

export default IAlertRepository;
