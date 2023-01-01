import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { IBcryptService } from '../../../application/interface/spi/ibcypt.service';

@Injectable()
export class BcryptService implements IBcryptService {
  rounds = 10;

  async hash(hashString: string): Promise<string> {
    return await bcrypt.hash(hashString, this.rounds);
  }

  async compare(password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }
}
