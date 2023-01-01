import { Module } from '@nestjs/common';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { IDataService } from '../interface/spi/idata.service';
import { DataService } from '../../infrastructure/persistence/db/data.service';
import { UserGRPCService } from '../../infrastructure/persistence/services/users.grpc.service';
import { LoggerModule } from './logger.module';
import { USER_MICROSERVICE_CLIENT } from '../interface/spi/iusers.service';

// Can be moved in separate module as well

@Module({
  imports: [
    LoggerModule,
    ClientsModule.register([
      {
        name: USER_MICROSERVICE_CLIENT,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50001',
          protoPath: join(__dirname, '../../../proto/users.proto'),
          package: 'users',
        },
      },
    ]),
    // ClientsModule.register([
    //   {
    //     name: 'MyMicroservices',
    //     transport: Transport.REDIS,
    //     options: {
    //       host: 'localhost',
    //       port: 6379,
    //     },
    //   },
    // ]),
    // ClientsModule.register([
    //   {
    //     name: 'userService',
    //     transport: Transport.GRPC,
    //     options: {
    //       package: 'users',
    //       //   protoPath: join(__dirname, './src/proto/users.proto'),
    //       // },
    //       protoPath: './apps/api.gateway/src/proto/users.proto',
    //       loader: {
    //         includeDirs: [join(__dirname, '..', 'protos')],
    //       },
    //     },
    //   },
    // ]),
  ],
  providers: [
    UserGRPCService,
    { provide: IDataService, useClass: DataService },
  ],
  exports: [IDataService],
})
export class DataServiceModule {}
