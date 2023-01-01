import { Injectable } from '@nestjs/common';

import { UserDto } from '../domain/dto/user.model';
import { IAuthService } from './interface/spi/iauth.service';
import { ILogger } from './interface/ilogger';
import { IAuthUseCase } from './interface/api/iauth.usecase';

@Injectable()
export class AuthUseCase implements IAuthUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly authService: IAuthService,
  ) {}

  public async signup(newUser: UserDto) {
    this.logger.debug('register');

    try {
      return this.authService.signup(newUser);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async login(user: any) {
    this.logger.debug('login');

    try {
      return this.authService.login(user);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async logout(id: string) {
    try {
      return this.authService.logout(id);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async refresh(token: string) {
    try {
      return this.authService.refresh(token);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async getAuthUser(email: string, password: string) {
    this.logger.debug('getAuthUser');

    try {
      return this.authService.getAuthUser(email, password);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
