import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';

import { RefreshTokenGuard } from '../../application/auth/guard/refresh-token.guard';

import { AccessTokenGuard } from '../../application/auth/guard/access-token.guard';
import { LocalAuthGuard } from '../../application/auth/guard/local-auth.guard';
import { UserDto } from '../../domain/dto/user.model';
import { ILogger } from '../../application/interface/ilogger';
import { IAuthUseCase } from '../../application/interface/api/iauth.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: IAuthUseCase,
    private readonly logger: ILogger,
  ) {}

  @Post('register')
  create(@Body() createUserDto: UserDto) {
    this.logger.debug('register');
    return this.authService.signup(createUserDto);
  }

  // @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request) {
    this.logger.debug('login');
    return this.authService.login(request.body);
  }

  @UseGuards(AccessTokenGuard)
  @Post('test')
  async authenticate(@Request() request) {
    this.logger.debug('test');
    return 'Happy Coding !';
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refresh(@Request() request) {
    this.logger.debug('refresh');
    const refreshToken = request.user['refreshToken'];
    return await this.authService.refresh(refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@Request() request) {
    if (request?.user?.id) {
      return await this.authService.logout(request.user.id);
    }
  }
}
