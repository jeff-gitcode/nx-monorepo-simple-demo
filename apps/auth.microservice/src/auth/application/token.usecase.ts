import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
  TokenOptions,
  SignType,
  RefreshToken,
} from '../domain/entities/user.entity';
import { CreateTokenCommand } from './cqrs/command/create-token.command';
import { DeleteTokenCommand } from './cqrs/command/delete-token.command';
import { GetTokenQuery } from './cqrs/query/get-token.query';
import { IConfigService } from './interface/iconfig.service';
import { IJwtTokenService } from './interface/spi/ijwt-token.service';
import { ILogger } from './interface/ilogger';



@Injectable()
export class TokenUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly jwtService: IJwtTokenService,
    private readonly logger: ILogger,
    private readonly configService: IConfigService,
  ) {}

  async sign(tokenOptions: TokenOptions) {
    const { payload, signType } = tokenOptions;

    if (signType === SignType.Login) {
      const refreshObject: RefreshToken = {
        userId: payload.id,
      };

      const command = new CreateTokenCommand(refreshObject);

      await this.commandBus.execute(command);
    }

    const refreshPayload = await this.queryBus.execute(
      new GetTokenQuery(payload.id),
    );

    const [accessToken, refreshToken] = await Promise.all([
      // access token
      this.jwtService.signAsync(payload, this.configService.getSecret(), '1h'),
      // refresh token
      this.jwtService.signAsync(
        refreshPayload,
        this.configService.getRefreshSecret(),
        '1d',
      ),
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

      const refreshToken = await this.queryBus.execute(
        new GetTokenQuery(decoded.userId),
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

    await this.commandBus.execute(new DeleteTokenCommand(payload.id));
  }
}
