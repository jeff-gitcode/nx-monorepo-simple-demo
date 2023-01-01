import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { ILogger } from '../../../application/interface/ilogger';
import { IUserRepository } from '../../../application/interface/spi/irepository';
import { PrismaService } from '../../../application/prisma/prisma.service';
import { SearchDTO, UserDto } from '../../../domain/dto/user.model';

@Injectable()
export class UsersMongoRepository implements IUserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: ILogger
  ) {
    console.log(
      '🚀 ~ file: users.mongo.repository.ts:11 ~ UsersMongoRepository'
    );
  }

  async create(item: UserDto) {
    this.logger.debug('[mongo] create');

    const searchDto: SearchDTO = {
      key: 'email',
      value: item.email,
    };

    const existingUser = await this.findOne(searchDto);

    if (existingUser) {
      item.id = existingUser.id;
      return item;
    }

    try {
      const result = await this.prisma.user.create({
        data: mapToUser(item),
      });

      return mapToUserDto(result);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async update(item: UserDto): Promise<UserDto> {
    this.logger.debug('[mongo] update');

    try {
      const { id, ...updateUser } = mapToUser(item);
      const user = await this.prisma.user.update({
        where: { id },
        data: { ...updateUser },
      });
      return mapToUserDto(user);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async remove(id: string): Promise<UserDto> {
    this.logger.debug('[mongo] remove');

    try {
      const result = await this.prisma.user.delete({ where: { id: id } });

      return mapToUserDto(result);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findAll(): Promise<UserDto[]> {
    this.logger.debug('[mongo] findall');
    try {
      const users = await this.prisma.user.findMany();
      return users.map((user) => mapToUserDto(user));
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findOneById(id: string): Promise<UserDto> {
    this.logger.debug('[mongo] findonebyid');
    this.logger.debug(id);
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      return mapToUserDto(user);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findOne(searchDto: SearchDTO): Promise<UserDto> {
    this.logger.debug('[mongo] findOneByEmail');

    try {
      const queryObject = { [searchDto.key]: searchDto.value };

      const user = await this.prisma.user.findUnique({
        where: queryObject,
      });
      return mapToUserDto(user);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

function mapToUser(dto: UserDto) {
  if (!dto) return null;

  const user: User = {
    id: dto.id,
    firstName: dto.firstName,
    lastName: dto.lastName,
    email: dto.email,
    password: dto.password,
  };

  return user;
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
