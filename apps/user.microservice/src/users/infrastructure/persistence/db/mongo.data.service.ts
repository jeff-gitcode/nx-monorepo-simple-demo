import { Injectable } from '@nestjs/common';

import { IDataService } from '../../../application/interface/spi/idata.service';
import { UsersMongoRepository } from './users.mongo.repository';

@Injectable()
export class MongoDataService implements IDataService {
  constructor(readonly users: UsersMongoRepository) {}
}
