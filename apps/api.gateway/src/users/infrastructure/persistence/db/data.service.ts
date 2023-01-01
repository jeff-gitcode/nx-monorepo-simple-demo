import { Injectable } from '@nestjs/common';

import { IDataService } from '../../../application/interface/spi/idata.service';
import { UserGRPCService } from '../services/users.grpc.service';

@Injectable()
export class DataService implements IDataService {
  constructor(readonly users: UserGRPCService) {}
}