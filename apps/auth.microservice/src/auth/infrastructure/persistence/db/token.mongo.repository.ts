import { Injectable } from '@nestjs/common';

import { RefreshToken } from '../../../domain/entities/user.entity';
import { ILogger } from '../../../application/interface/ilogger';
import { IRefreshTokenRepository } from '../../../application/interface/spi/irepository';
import { PrismaService } from '../../../application/prisma/prisma.service';
import { SearchDTO } from '../../../domain/dto/user.model';

@Injectable()
export class TokenMongoDBRepository implements IRefreshTokenRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: ILogger,
  ) {}

  async create(item: RefreshToken) {
    this.logger.debug('create');

    try {
      const searchDto: SearchDTO = {
        key: 'userId',
        value: item.userId,
      };

      const existingToken = await this.findOne(searchDto);

      if (existingToken) {
        item.id = existingToken.id;
        return item;
      }

      const result = await this.prisma.refreshToken.create({
        data: mapToEntity(item),
      });

      return mapToDto(result);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async update(item: RefreshToken): Promise<RefreshToken> {
    this.logger.debug('update');

    try {
      const { id, ...updateToken } = mapToEntity(item);
      const token = await this.prisma.refreshToken.update({
        where: { id },
        data: { ...updateToken },
      });
      return mapToDto(token);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async remove(id: string): Promise<RefreshToken> {
    this.logger.debug('remove');

    try {
      const result = await this.prisma.refreshToken.delete({
        where: { userId: id },
      });

      return mapToDto(result);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findAll(): Promise<RefreshToken[]> {
    this.logger.debug('findall');
    try {
      const result = await this.prisma.refreshToken.findMany();
      return result.map((item) => mapToDto(item));
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findOneById(id: string): Promise<RefreshToken> {
    this.logger.debug('findonebyid');

    try {
      const token = await this.prisma.refreshToken.findUnique({
        where: {
          userId: id,
        },
      });
      return mapToDto(token);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findOne(searchDto: SearchDTO): Promise<RefreshToken> {
    this.logger.debug('findOneByEmail');

    try {
      const queryObject = { [searchDto.key]: searchDto.value };

      const token = await this.prisma.refreshToken.findUnique({
        where: queryObject,
      });
      return mapToDto(token);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

function mapToEntity(dto: RefreshToken) {
  if (!dto) return null;

  const token: RefreshToken = {
    id: dto?.id,
    userId: dto?.userId,
  };

  return token;
}

function mapToDto(refreshToken: RefreshToken) {
  if (!refreshToken) return null;

  const token: RefreshToken = {
    id: refreshToken?.id,
    userId: refreshToken?.userId,
  };
  return token;
}
