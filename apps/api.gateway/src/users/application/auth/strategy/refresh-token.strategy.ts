import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

import { IConfigService } from '../../interface/iconfig.service';
import { IUserUseCase } from '../../interface/api/iuser.usecase';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  private readonly configService: IConfigService;

  constructor(
    private readonly userUseCase: IUserUseCase,
    configService: IConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: 'refreshsecret', // configService.getRefreshSecret(),
    });

    this.configService = configService;
  }

  async validate(request: Request, payload: any) {
    // check if user in the token actually exist
    // const refreshToken = req.get('Authentication').replace('Bearer', '').trim();

    const user = await this.userUseCase.findOne(payload.userId);
    if (!user) {
      throw new UnauthorizedException('Not authorized user');
    }

    const refreshToken = request.rawHeaders
      .filter((header) => header.startsWith('Bearer'))[0]
      .replace('Bearer', '')
      .trim();
    return { ...payload, refreshToken };
    // return payload;
  }
}
