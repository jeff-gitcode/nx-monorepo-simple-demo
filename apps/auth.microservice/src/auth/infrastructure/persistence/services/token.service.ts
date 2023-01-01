import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ILogger } from '../../../application/interface/ilogger';
import { IDataService } from '../../../application/interface/spi/idata.service';
import { ITokenService } from '../../../application/interface/spi/itoken.service';
import {
  RefreshToken,
  SignType,
  TokenOptions,
} from '../../../domain/entities/user.entity';
import { IConfigService } from '../../../application/interface/iconfig.service';

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    private readonly dataService: IDataService,
    private readonly jwtService: JwtService,
    private readonly logger: ILogger,
    private readonly configService: IConfigService,
  ) {}

  async sign(tokenOptions: TokenOptions) {
    const { payload, signType } = tokenOptions;

    if (signType === SignType.Login) {
      const refreshObject: RefreshToken = {
        userId: payload.id,
      };

      await this.dataService.refreshTokens.create(refreshObject);
    }
    const refreshPayload = await this.dataService.refreshTokens.findOneById(
      payload.id,
    );

    const [accessToken, refreshToken] = await Promise.all([
      // access token
      this.jwtService.signAsync(payload, {
        expiresIn: '1h',
        secret: this.configService.getSecret(),
      }),
      // refresh token
      this.jwtService.signAsync(refreshPayload, {
        expiresIn: '1d',
        secret: this.configService.getRefreshSecret(),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async verify(tokenOptions: TokenOptions) {
    try {
      const { token, ...rest } = tokenOptions;

      const decoded = await this.jwtService.verify(token, rest);

      const refreshToken = await this.dataService.refreshTokens.findOneById(
        decoded.userId,
      );

      if (!refreshToken) {
        return undefined;
      }

      return refreshToken;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async signOff(tokenOptions: TokenOptions) {
    const { payload } = tokenOptions;

    await this.dataService.refreshTokens.remove(payload.id);
  }
}
