import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IConfigService } from '../../../application/interface/iconfig.service';

@Injectable()
export class EnvConfigService implements IConfigService {
  constructor(private configService: ConfigService) {}

  getEnv(): string {
    return this.configService.get<string>('ENV');
  }

  getSecret(): string {
    return this.configService.get<string>('SECRET');
  }

  getRefreshSecret(): string {
    return this.configService.get<string>('REFRESHSECRET');
  }
}
