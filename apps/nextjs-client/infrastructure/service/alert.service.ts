import { injectable } from 'inversify';
import { Subscription } from 'react-hook-form/dist/utils/createSubject';
import 'reflect-metadata';
import { Subject } from 'rxjs';

import { IAlertService } from '../../application/interface/spi/ialert.service';
import { AlertMessage } from '../../domain/alert';

@injectable()
export class AlertService implements IAlertService {
  private subject = new Subject<AlertMessage>();

  initial(): AlertMessage[] {
    return [] as AlertMessage[];
  }

  subscribe(observer: any): Subscription {
    return this.subject.asObservable().subscribe(observer);
  }

  sendMessage(message: AlertMessage): void {
    this.subject.next(message);
  }

  reset(): void {
    this.subject.next({} as AlertMessage);
  }
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning,
}
