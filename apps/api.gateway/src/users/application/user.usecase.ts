import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { SearchDTO, UserDto } from '../domain/dto/user.model';
import { CreateUserCommand } from './cqrs/command/create-user.command';
import { DeleteUserCommand } from './cqrs/command/delete-user.command';
import { UpdateUserCommand } from './cqrs/command/update-user.command';
import { GetUserQuery } from './cqrs/query/get-user.query';
import { GetUserByDynamicQuery } from './cqrs/query/get-userbyDynamic.query';
import { GetUsersQuery } from './cqrs/query/get-users.query';
import { ILogger } from './interface/ilogger';
import { IUserUseCase } from './interface/api/iuser.usecase';

@Injectable()
export class UserUseCase implements IUserUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly logger: ILogger,
  ) {}

  async create(createUserDto: UserDto): Promise<UserDto> {
    try {
      this.logger.debug('create');

      const command = new CreateUserCommand(createUserDto);

      return await this.commandBus.execute(command);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findAll(): Promise<UserDto[]> {
    try {
      this.logger.debug('findAll');

      return await this.queryBus.execute(new GetUsersQuery());
    } catch (errors) {
      this.logger.error(errors);
      throw errors;
    }
  }

  async findOne(id: string): Promise<UserDto> {
    try {
      this.logger.debug('findOne');

      return await this.queryBus.execute(new GetUserQuery(id));
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findOneDynamic(searchDto: SearchDTO): Promise<UserDto> {
    try {
      this.logger.debug('findOne');

      return await this.queryBus.execute(new GetUserByDynamicQuery(searchDto));
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async update(updateUserDto: UserDto): Promise<UserDto> {
    try {
      this.logger.debug('update');

      return await this.commandBus.execute(
        new UpdateUserCommand(updateUserDto),
      );
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      this.logger.debug('remove');

      return await this.commandBus.execute(new DeleteUserCommand(id));
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // async signUp(signupDTO: UserDto): Promise<AuthUser> {
  //   try {
  //     const command = new CreateUserCommand(signupDTO);

  //     const user = await this.commandBus.execute(command);

  //     return user;
  //   } catch (error) {
  //     this.logger.error(error);
  //     throw error;
  //   }
  // }

  // async validateUser(email: string, password: string): Promise<UserDto> {
  //   try {
  //     this.logger.debug('validateUser');

  //     return await this.queryBus.execute(new GetUserQuery('1'));
  //   } catch (error) {
  //     this.logger.error(error);
  //     throw error;
  //   }
  // }

  // async logIn(loginDTO: LoginDTO): Promise<UserDto> {
  //   try {
  //     this.logger.debug('findOne');

  //     return await this.queryBus.execute(new GetUserQuery('1'));
  //   } catch (error) {
  //     this.logger.error(error);
  //     throw error;
  //   }
  // }
}
