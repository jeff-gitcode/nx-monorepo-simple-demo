import { Injectable } from '@nestjs/common';

import { IDataService } from '../../../application/interface/spi/idata.service';
import { UsersMockDBRepository } from './users.mockdb.repository';

@Injectable()
export class MockDataService implements IDataService {
  constructor(readonly users: UsersMockDBRepository) {}
}
