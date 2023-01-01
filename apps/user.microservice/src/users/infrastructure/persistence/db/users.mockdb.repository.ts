import { Injectable } from '@nestjs/common';

import { ILogger } from '../../../application/interface/ilogger';
import { IUserRepository } from '../../../application/interface/spi/irepository';
import { SearchDTO, UserDto } from '../../../domain/dto/user.model';
import { User } from '../../../domain/entities/user.entity';

@Injectable()
export class UsersMockDBRepository implements IUserRepository {
  private users: User[] = [];

  constructor(private readonly logger: ILogger) {}

  async create(item: UserDto): Promise<UserDto> {
    this.logger.debug('[mock] create');

    const user = mapToUser(item);

    const searchDto: SearchDTO = {
      key: 'email',
      value: item.email,
    };

    const existingUser = await this.findOne(searchDto);

    if (existingUser) {
      item.id = existingUser.id;
      return item;
    }

    const id = this.users.length + 1;

    user.id = id.toString();

    this.users.push(user);

    item.id = id.toString();

    return item;
  }

  async update(item: UserDto): Promise<UserDto> {
    this.logger.debug('[mock] update');

    const user = mapToUser(item);

    this.users = this.users.filter((c: User) => c.id !== item.id);

    this.users.push(user);

    return item;
  }

  async remove(id: string): Promise<UserDto> {
    this.logger.debug('[mock] remove');

    const user = this.users.filter((item: User) => item.id === id)[0];

    this.users = this.users.filter((item: User) => item.id !== id);

    return user;
  }

  async findAll(): Promise<UserDto[]> {
    this.logger.debug('[mock] findall');

    return this.users;
  }
  async findOneById(id: string): Promise<UserDto> {
    this.logger.debug('[mock] findonebyid');

    return await getUserById(this.users, id);
  }
  async findOne(searchDto: SearchDTO): Promise<UserDto> {
    this.logger.debug('[mock] findonebyEmail');
    const { key, value } = searchDto;

    const user = await this.users.filter(
      (user: User) => user[key] === searchDto.value
    )?.[0];
    return user;
  }
}

const getUserById = async (users: User[], id: string): Promise<User> =>
  await users.filter((user: User) => user.id === id)?.[0];

const mapToUser = (dto: UserDto): User => {
  if (!dto) return null;

  const {
    id,
    email,
    password,
    firstName,
    lastName,
    accessToken,
    refreshToken,
  } = dto;

  const user: User = {
    id,
    email,
    password: password,
    firstName,
    lastName,
    accessToken,
    refreshToken,
  };

  return user;
};
