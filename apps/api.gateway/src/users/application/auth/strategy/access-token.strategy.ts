import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { IConfigService } from '../../interface/iconfig.service';
import { IUserUseCase } from '../../interface/api/iuser.usecase';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly configService: IConfigService;

  constructor(
    private readonly userUseCase: IUserUseCase,
    configService: IConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret', // [TODO] configService.getSecret(),
    });

    this.configService = configService;
  }

  async validate(payload: any) {
    // check if user in the token actually exist
    const user = await this.userUseCase.findOne(payload.id);
    if (!user) {
      throw new UnauthorizedException('Not authorized user');
    }
    return payload;
  }
}
