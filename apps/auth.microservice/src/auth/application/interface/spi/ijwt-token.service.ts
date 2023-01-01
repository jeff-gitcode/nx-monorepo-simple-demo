import { JwtVerifyOptions } from '@nestjs/jwt';
import { RefreshToken } from '../../../domain/entities/user.entity';

export abstract class IJwtTokenService {
  abstract verify(token: string, options?: JwtVerifyOptions): Promise<any>;

  abstract signAsync(
    payload: RefreshToken,
    secret: string,
    expiresIn: string,
  ): Promise<string>;
}
