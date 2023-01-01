import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { ILogger } from '../../../application/interface/ilogger';
import { SearchDTO, UserDto } from '../../../domain/dto/user.model';
import {
  User,
  UserId,
  UserService,
  UsersList,
} from '../../../../../../../proto/users';
import { IUserService } from '../../../application/interface/spi/iusers.service';
import { userGrpcClient } from '../../../../proto/user-grpc.client';

@Injectable()
export class UserGRPCService implements IUserService, OnModuleInit {
  @Client(userGrpcClient)
  private readonly userClient: ClientGrpc;
  private userService: UserService;

  constructor(
    private readonly logger: ILogger, // @Inject('userGrpcClient') private readonly userClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userService = this.userClient.getService('UserService');
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

    // const response = firstValueFrom(
    //   this.userClient.send<UserDto, UserDto>('create', item),
    // );
    // return response;
  }

  async update(item: UserDto): Promise<UserDto> {
    this.logger.debug('update');

    return await lastValueFrom(this.userService.Update(item));

    // const response = firstValueFrom(
    //   this.userClient.send<UserDto, UserDto>('update', item),
    // );
    // return response;
  }

  async remove(id: string): Promise<UserDto> {
    this.logger.debug('remove');

    const request: UserId = {
      id,
    };
    return await await lastValueFrom(this.userService.Remove(request));

    // const response = firstValueFrom(
    //   this.userClient.send<UserDto, string>('remove', id),
    // );
    // return response;
  }

  async findAll(): Promise<UserDto[]> {
    this.logger.debug('findall');

    const request: UserId = {
      id: '1',
    };
    const response: UsersList = await await lastValueFrom(
      this.userService.FindAllUsers(request),
    );

    const result = await response.users.map((r) => mapToUserDto(r));
    return result;
    // this.userClient.
    // const response = firstValueFrom(
    //   this.userClient.send<UserDto[], string>('getAll', ''),
    // );
    // return response;
  }

  async findOneById(id: string): Promise<UserDto> {
    this.logger.debug('findonebyid:');
    const request: UserId = {
      id,
    };

    return await lastValueFrom(this.userService.FindOneByUserId(request));

    // const response = firstValueFrom(
    //   this.userClient.send<UserDto, string>('findOneById', id),
    // );
    // return response;
  }

  async findOne(searchDto: SearchDTO): Promise<UserDto> {
    this.logger.debug('findone');

    return await lastValueFrom(this.userService.FindOne(searchDto));
    // const response = firstValueFrom(
    //   this.userClient.send<UserDto, SearchDTO>('findOne', searchDto),
    // );
    // return response;
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
