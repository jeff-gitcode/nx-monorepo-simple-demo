import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { LoginUser, UserDto } from '../../domain/dto/user.model';
import { ILogger } from '../../application/interface/ilogger';
import { IAuthUseCase } from '../../application/interface/api/iauth.usecase';

@Controller('auth')
export class AuthGRPCController {
  constructor(
    private authUseCase: IAuthUseCase,
    private readonly logger: ILogger,
  ) {}

  @GrpcMethod('AuthService', 'Create')
  create(request: UserDto) {
    this.logger.debug('register');
    return this.authUseCase.signup(request);
  }

  @GrpcMethod('AuthService', 'Login')
  async login(request: LoginUser) {
    this.logger.debug('login');
    return this.authUseCase.login(request);
  }

  @GrpcMethod('AuthService', 'Authenticate')
  async authenticate() {
    this.logger.debug('test');
    return 'Happy Coding !';
  }

  @GrpcMethod('AuthService', 'Refresh')
  async refresh(request: string) {
    this.logger.debug('refresh');
    return await this.authUseCase.refresh(request);
  }

  @GrpcMethod('AuthService', 'Logout')
  async logout(request: string) {
    return await this.authUseCase.logout(request);
  }

  @GrpcMethod('AuthService', 'GetAuthUser')
  async getAuthUser(request: LoginUser) {
    return await this.authUseCase.getAuthUser(
      request.username,
      request.password,
    );
  }
}
