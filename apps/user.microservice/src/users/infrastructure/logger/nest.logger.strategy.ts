import { Injectable, Logger } from '@nestjs/common';
import { ILogger } from '../../application/interface/ilogger';

@Injectable()
export class NestLoggerStrategy extends ILogger {
  private readonly logger = new Logger();

  debug(context: string) {
    this.logger.debug(context);
  }
  log(context: string) {
    this.logger.log(context);
  }
  error(context: string, trace?: string) {
    this.logger.error(trace, context);
  }
  warn(context: string) {
    this.logger.warn(context);
  }
}
