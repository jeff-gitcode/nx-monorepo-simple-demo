import { Module } from '@nestjs/common';

import { IDataService } from '../interface/spi/idata.service';
import { MockDataService } from '../../infrastructure/persistence/db/mock.data.service';
import { TokenMockDBRepository } from '../../infrastructure/persistence/db/token.mockdb.repository';
import { MongoDataService } from '../../infrastructure/persistence/db/mongo.data.service';
import { PrismaService } from '../prisma/prisma.service';
import { LoggerModule } from './logger.module';
import { TokenMongoDBRepository } from '../../infrastructure/persistence/db/token.mongo.repository';
import { UserGRPCService } from '../../infrastructure/persistence/services/users.grpc.service';

// Can be moved in separate module as well
const repository =
  process.env.DB === 'mongo'
    ? [PrismaService, UserGRPCService, TokenMongoDBRepository]
    : [UserGRPCService, TokenMockDBRepository];

const dataService =
  process.env.DB === 'mongo' ? MongoDataService : MockDataService;

@Module({
  imports: [LoggerModule],
  providers: [...repository, { provide: IDataService, useClass: dataService }],
  exports: [IDataService],
})
export class DataServiceModule {}
