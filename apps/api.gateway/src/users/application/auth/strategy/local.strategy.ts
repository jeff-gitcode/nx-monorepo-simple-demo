import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserDto } from '../../../domain/dto/user.model';
import { IAuthUseCase } from '../../interface/api/iauth.usecase';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: IAuthUseCase) {
    super();
  }

  async validate(username: string, password: string): Promise<UserDto> {
    const user = await this.authService.getAuthUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
