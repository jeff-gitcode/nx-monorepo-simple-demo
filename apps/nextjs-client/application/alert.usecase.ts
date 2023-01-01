import { inject, injectable } from 'inversify';
import { Subscription } from 'react-hook-form/dist/utils/createSubject';
import { AlertMessage } from '../domain/alert';
import { IAlertUseCase } from './interface/api/ialert.usecase';
import { IAlertService } from './interface/spi/ialert.service';

import { TYPES } from './interface/types';

@injectable()
class AlertUseCase implements IAlertUseCase {
  constructor(
    @inject(TYPES.AlertService)
    private readonly alertService: IAlertService
  ) {}

  initial(): AlertMessage[] {
    return this.alertService.initial();
  }
  subscribe(observer: any): Subscription {
    return this.alertService.subscribe(observer);
  }
  sendMessage(message: AlertMessage): void {
    this.alertService.sendMessage(message);
  }
  clearMessage(): void {
    this.alertService.reset();
  }
}

export default AlertUseCase;
