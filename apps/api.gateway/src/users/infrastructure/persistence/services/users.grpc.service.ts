import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import {
  User,
  UserId,
  UserService,
  UsersList
} from '../../../../../../../proto/users';
import { ILogger } from '../../../application/interface/ilogger';
import {
  IUserService,
  USER_MICROSERVICE_CLIENT
} from '../../../application/interface/spi/iusers.service';
import { SearchDTO, UserDto } from '../../../domain/dto/user.model';

@Injectable()
export class UserGRPCService implements IUserService, OnModuleInit {
  private userService: UserService;

  constructor(
    private readonly logger: ILogger,
    @Inject(USER_MICROSERVICE_CLIENT) private readonly userClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.userService = this.userClient.getService<UserService>('UserService');
  }

  async create(item: UserDto): Promise<UserDto> {
    this.logger.debug('create');

    const user: User = {
      id: item.id,
      email: item.email,
      password: item.password,
      firstName: item.firstName,
      lastName: item.lastName,
      accessToken: item.accessToken,
      refreshToken: item.refreshToken,
    };

    const result = await lastValueFrom(this.userService.Create(user));
    return result;
  }

  async update(item: UserDto): Promise<UserDto> {
    this.logger.debug('update');

    return await lastValueFrom(this.userService.Update(item));
  }

  async remove(id: string): Promise<UserDto> {
    this.logger.debug('remove');

    const request: UserId = {
      id,
    };
    return await await lastValueFrom(this.userService.Remove(request));
  }

  async findAll(): Promise<UserDto[]> {
    this.logger.debug('findall');

    const request: UserId = {
      id: '1',
    };
    const response: UsersList = await await lastValueFrom(
      this.userService.FindAllUsers(request)
    );

    const result = await response.users.map((r) => mapToUserDto(r));
    return result;
  }

  async findOneById(id: string): Promise<UserDto> {
    this.logger.debug('findonebyid:');
    const request: UserId = {
      id,
    };

    return await lastValueFrom(this.userService.FindOneByUserId(request));
  }

  async findOne(searchDto: SearchDTO): Promise<UserDto> {
    this.logger.debug('findone');

    return await lastValueFrom(this.userService.FindOne(searchDto));
  }
}

function mapToUserDto(user: User) {
  if (!user) return null;

  const dto: UserDto = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    accessToken: '',
    refreshToken: '',
  };
  return dto;
}
