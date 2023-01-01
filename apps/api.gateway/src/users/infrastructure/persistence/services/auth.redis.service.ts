import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';

import {
  AUTH_MICROSERVICE_CLIENT,
  IAuthService,
} from '../../../application/interface/spi/iauth.service';
import { ILogger } from '../../../application/interface/ilogger';
import { UserDto, LoginUser, TokenDto } from '../../../domain/dto/user.model';

@Injectable()
export class AuthRedisService implements IAuthService {
  constructor(
    private readonly logger: ILogger,
    @Inject(AUTH_MICROSERVICE_CLIENT)
    private readonly authRedisService: ClientProxy,
  ) {}

  public async signup(newUser: UserDto) {
    this.logger.debug('register');

    try {
      const response = lastValueFrom(
        this.authRedisService.send<UserDto, UserDto>('register', newUser),
      );
      return response;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async login(user: any) {
    this.logger.debug('login');

    try {
      const response = firstValueFrom(
        this.authRedisService.send<UserDto, LoginUser>('login', user),
      );
      return response;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async logout(id: string) {
    try {
      const response = firstValueFrom(
        this.authRedisService.send<TokenDto, string>('logout', id),
      );
      return response;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async refresh(token: string) {
    try {
      const response = firstValueFrom(
        this.authRedisService.send<TokenDto, string>('refresh', token),
      );
      return response;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async getAuthUser(email: string, password: string) {
    this.logger.debug('getAuthUser');

    try {
      const user: LoginUser = {
        id: '',
        username: email,
        password: password,
      };
      const response = firstValueFrom(
        this.authRedisService.send<UserDto, LoginUser>('getAuthUser', user),
      );

      return response;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
