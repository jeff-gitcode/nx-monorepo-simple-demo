import { Injectable } from '@nestjs/common';

import { IDataService } from '../../../application/interface/spi/idata.service';
import { UserGRPCService } from '../services/users.grpc.service';
import { TokenMongoDBRepository } from './token.mongo.repository';

@Injectable()
export class MongoDataService implements IDataService {
  constructor(
    readonly users: UserGRPCService,
    readonly refreshTokens: TokenMongoDBRepository,
  ) {}
}
