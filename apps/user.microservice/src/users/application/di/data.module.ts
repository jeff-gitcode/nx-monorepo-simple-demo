import { Module } from '@nestjs/common';

import { MockDataService } from '../../infrastructure/persistence/db/mock.data.service';
import { MongoDataService } from '../../infrastructure/persistence/db/mongo.data.service';
import { UsersMockDBRepository } from '../../infrastructure/persistence/db/users.mockdb.repository';
import { UsersMongoRepository } from '../../infrastructure/persistence/db/users.mongo.repository';
import { IDataService } from '../interface/spi/idata.service';
import { PrismaService } from '../prisma/prisma.service';
import { LoggerModule } from './logger.module';

// Can be moved in separate module as well
console.log(
  `🚀 ~ file: data.module.ts:14 ~ process.env.DB:[${process.env.DB}].`
);
const repository =
  process.env.DB === 'mongo'
    ? [PrismaService, UsersMongoRepository]
    : [UsersMockDBRepository];

const dataService =
  process.env.DB === 'mongo' ? MongoDataService : MockDataService;

@Module({
  imports: [LoggerModule],
  providers: [...repository, { provide: IDataService, useClass: dataService }],
  exports: [IDataService],
})
export class DataServiceModule {}
