import { AlertType } from '../infrastructure/service/alert.service';

export interface AlertMessage {
  id?: string;
  type: AlertType;
  message: string;
}
