```bash
# upgrade nx
$ nx migrate latest

## Add the Nx Nest plugin
$ yarn add -D @nrwl/nest

## Create backend service
$ nx generate @nrwl/nest:app api.gateway
$ nx generate @nrwl/nest:app auth.microservice
$ nx generate @nrwl/nest:app user.microservice

## graphql
$ yarn add @nestjs/graphql graphql-tools graphql apollo-server-express @nest/apollo
## passport, cqrs, swagger, microservice, jwt
$ yarn add @nestjs/passport @nestjs/cqrs @nestjs/swagger @nestjs/microservices @nestjs/jwt
## passport jwt, passport-local, bcrypt
$ yarn add @nestjs/passport passport passport-local passport-jwt bcrypt
$ yarn add -D @types/passport-jwt @types/passport-local @types/bcrypt
## joi validation
$ yarn add joi
$ yarn add -D @types/joi
## prisma
$ yarn add -D prisma @prisma/client
## nestjs config
$ yarn add -D @nestjs/config
## grpc
$ yarn add @grpc/grpc-js @grpc/proto-loader

## Install Redis client in microservice
$ yarn add ioredis

```

[Back to README](../README.md)
