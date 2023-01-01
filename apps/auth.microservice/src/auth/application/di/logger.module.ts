import { Module } from '@nestjs/common';

import { ConsoleLoggerStrategy } from '../../infrastructure/logger/console.logger.strategy';
import { NestLoggerStrategy } from '../../infrastructure/logger/nest.logger.strategy';
import { ILogger } from '../interface/ilogger';

// Can be moved in separate module as well
const logger =
  process.env.DB === 'mongo' ? NestLoggerStrategy : ConsoleLoggerStrategy;

@Module({
  providers: [{ provide: ILogger, useClass: logger }],
  exports: [ILogger],
})
export class LoggerModule {}
