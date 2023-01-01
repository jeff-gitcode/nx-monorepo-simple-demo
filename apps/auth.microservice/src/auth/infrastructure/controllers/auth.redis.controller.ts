import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { LoginUser, UserDto } from '../../domain/dto/user.model';
import { ILogger } from '../../application/interface/ilogger';
import { IAuthUseCase } from '../../application/interface/api/iauth.usecase';

@Controller('auth')
export class AuthRedisController {
  constructor(
    private authUseCase: IAuthUseCase,
    private readonly logger: ILogger,
  ) {}

  @MessagePattern('register')
  create(request: UserDto) {
    this.logger.debug('register');
    return this.authUseCase.signup(request);
  }

  @MessagePattern('login')
  async login(request: LoginUser) {
    this.logger.debug('login');
    return this.authUseCase.login(request);
  }

  @MessagePattern('test')
  async authenticate() {
    this.logger.debug('test');
    return 'Happy Coding !';
  }

  @MessagePattern('refresh')
  async refresh(request: string) {
    this.logger.debug('refresh');
    return await this.authUseCase.refresh(request);
  }

  @MessagePattern('logout')
  async logout(request: string) {
    return await this.authUseCase.logout(request);
  }

  @MessagePattern('getAuthUser')
  async getAuthUser(request: LoginUser) {
    return await this.authUseCase.getAuthUser(
      request.username,
      request.password,
    );
  }
}
