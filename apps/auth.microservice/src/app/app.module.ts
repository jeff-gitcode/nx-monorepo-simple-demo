import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/application/di/auth.module';
import { DataServiceModule } from '../auth/application/di/data.module';
import { UsersModule } from '../auth/application/di/user.module';
import { LoggerMiddleware } from '../middleware/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule,
    DataServiceModule,
    UsersModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      //autoSchemaFile: true,
      autoSchemaFile: 'schema.gql',
    }),
    // MongooseModule.forRoot(process.env.MONGO_URI),
    // JwtModule.register({
    //   secret: 'JWTKEY',
    //   signOptions: { expiresIn: '1600s' },
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}

// import { Module } from '@nestjs/common';

// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}