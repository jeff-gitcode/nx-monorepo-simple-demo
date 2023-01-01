import { Subscription } from 'react-hook-form/dist/utils/createSubject';
import { AlertMessage } from '../../../domain/alert';

export abstract class IAlertService {
  abstract initial(): AlertMessage[];

  abstract subscribe(observer: any): Subscription;

  abstract sendMessage(message: AlertMessage): void;

  abstract reset(): void;
}
