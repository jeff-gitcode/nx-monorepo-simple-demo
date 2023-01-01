/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app/app.module';

async function bootstrap() {
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.REDIS,
  //     options: {
  //       host: 'localhost',
  //       port: 6379,
  //     },
  //   },
  // );

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:50001',
        protoPath: join(__dirname, '../../../proto/users.proto'),
        package: 'users',
      },
      // options: {
      //   package: 'users',
      //   //   protoPath: join(__dirname, './src/proto/users.proto'),
      //   // },
      //   url: 'localhost:50001',
      //   protoPath: './apps/user.microservice/src/proto/users.proto',
      //   loader: {
      //     includeDirs: [join(__dirname, '..', 'protos')],
      //   },
      // },
    }
  );
  await app.listen();
  console.log('User (microservices) is listening... ');

  // const app = await NestFactory.create(AppModule);
  // const globalPrefix = 'api';
  // app.setGlobalPrefix(globalPrefix);
  // const port = process.env.PORT || 3333;
  // await app.listen(port);
  // Logger.log(
  //   `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  // );
}

bootstrap();
