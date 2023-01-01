import { Injectable } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';

import { RefreshToken } from '../../../domain/entities/user.entity';
import { IJwtTokenService } from '../../../application/interface/spi/ijwt-token.service';

@Injectable()
export class JwtTokenService implements IJwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async verify(token: string, options?: JwtVerifyOptions): Promise<any> {
    const decode = await this.jwtService.verifyAsync(token, options);
    return decode;
  }

  async signAsync(
    payload: RefreshToken,
    secret: string,
    expiresIn: string,
  ): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: secret,
      expiresIn: expiresIn,
    });
  }
}
