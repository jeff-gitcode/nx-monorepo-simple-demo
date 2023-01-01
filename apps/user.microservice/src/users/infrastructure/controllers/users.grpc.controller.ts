import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { UserDto } from '../../domain/dto/user.model';
import { ILogger } from '../../application/interface/ilogger';
import { Empty, Search, UserId } from 'proto/users';
import { IUserUseCase } from '../../application/interface/api/iuser.usecase';

@Controller('api')
export class UsersController {
  constructor(
    private readonly userUseCase: IUserUseCase,
    private readonly logger: ILogger,
  ) {}

  @GrpcMethod('UserService', 'Create')
  async create(createUserDto: UserDto): Promise<UserDto> {
    this.logger.debug('create user');
    return await this.userUseCase.create(createUserDto);
  }

  @GrpcMethod('UserService', 'FindAllUsers')
  async findAll(request: Empty) {
    this.logger.debug('getAll');
    const users = await this.userUseCase.findAll();
    return { users };
  }

  @GrpcMethod('UserService', 'FindOneByUserId')
  async findOneById(request: UserId) {
    return await this.userUseCase.findOne(request.id);
  }

  @GrpcMethod('UserService', 'FindOne')
  async findOne(searchDto: Search) {
    return await this.userUseCase.findOneDynamic(searchDto);
  }

  @GrpcMethod('UserService', 'Update')
  async update(updateUserDto: UserDto): Promise<UserDto> {
    return await this.userUseCase.update(updateUserDto);
  }

  @GrpcMethod('UserService', 'Remove')
  async remove(request: UserId): Promise<UserDto> {
    return await this.userUseCase.remove(request.id);
  }
}
