import { Injectable } from '@nestjs/common';

import { IDataService } from '../../../application/interface/spi/idata.service';
import { UserGRPCService } from '../services/users.grpc.service';
import { TokenMockDBRepository } from './token.mockdb.repository';

@Injectable()
export class MockDataService implements IDataService {
  constructor(
    readonly users: UserGRPCService,
    readonly refreshTokens: TokenMockDBRepository,
  ) {}
}
