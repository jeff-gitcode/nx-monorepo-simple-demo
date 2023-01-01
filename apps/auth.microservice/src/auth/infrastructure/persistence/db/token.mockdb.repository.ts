import { Injectable } from '@nestjs/common';

import { ILogger } from '../../../application/interface/ilogger';
import { IRefreshTokenRepository } from '../../../application/interface/spi/irepository';
import { SearchDTO } from '../../../domain/dto/user.model';
import { RefreshToken } from '../../../domain/entities/user.entity';

@Injectable()
export class TokenMockDBRepository implements IRefreshTokenRepository {
  constructor(private readonly logger: ILogger) {}

  private refreshTokens: RefreshToken[] = [];

  async create(item: RefreshToken): Promise<RefreshToken> {
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

      item.id = String(this.getMaxId(this.refreshTokens));

      this.refreshTokens.push(item);

      return item;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async update(item: RefreshToken): Promise<RefreshToken> {
    throw new Error('Method not implemented.');
  }

  async remove(id: string): Promise<RefreshToken> {
    const refreshToken = this.findOneById(id);

    this.refreshTokens = await Promise.resolve(
      this.refreshTokens.filter((refreshToken) => refreshToken.userId !== id),
    );

    return refreshToken;
  }

  async findAll(): Promise<RefreshToken[]> {
    throw new Error('Method not implemented.');
  }
  async findOneById(id: string): Promise<RefreshToken> {
    const refreshPayload = this.refreshTokens.find(
      (token) => token.userId === id,
    );

    return refreshPayload;
  }

  async findOne(searchDto: SearchDTO): Promise<RefreshToken> {
    this.logger.debug('findonebyUserId');
    const { key, value } = searchDto;

    const token = await this.refreshTokens.filter(
      (item: RefreshToken) => item[key] === searchDto.value,
    )?.[0];
    return token;
  }

  private addRefreshTokens(userId: string) {
    const refreshObject: RefreshToken = {
      id: String(this.getMaxId(this.refreshTokens)),
      userId: userId,
    };

    this.refreshTokens.push(refreshObject);
  }

  private getMaxId(refreshTokens: RefreshToken[]) {
    return refreshTokens.length === 0
      ? 1
      : parseInt(refreshTokens[refreshTokens.length - 1].id) + 1;
  }
}
