import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const userGrpcClient: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:50001',
    protoPath: join(
      __dirname,
      '../../../apps/api.gateway/src/proto/users.proto'
    ),
    package: 'users',
  },
  // options: {
  //   url: 'localhost:50001',
  //   package: 'users',
  //   protoPath: './apps/user.microservice/src/proto/users.proto',
  //   loader: {
  //     includeDirs: [join(__dirname, '..', 'protos')],
  //   },
  // },
};
