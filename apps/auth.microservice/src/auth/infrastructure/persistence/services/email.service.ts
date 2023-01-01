import { Injectable, Scope } from '@nestjs/common';

import { ILogger } from '../../../application/interface/ilogger';
import { IEmailService } from '../../../application/interface/spi/iemail.service';
import { UserDto } from '../../../domain/dto/user.model';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class EmailService implements IEmailService {
  constructor(private readonly logger: ILogger) {}

  async send(createUserDto: UserDto): Promise<void> {
    this.logger.debug(JSON.stringify(createUserDto));
  }
}
