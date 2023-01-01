import { UseGuards, Logger } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';

import {
  JWTAuth,
  LoginUser,
  MyCodingText,
  TokenDto,
  UserDto,
} from '../../domain/dto/user.model';
import { AccessTokenGuard } from '../../application/auth/guard/access-token.guard';
import { LocalAuthGuard } from '../../application/auth/guard/local-auth.guard';
import { RefreshTokenGuard } from '../../application/auth/guard/refresh-token.guard';
import { ILogger } from '../../application/interface/ilogger';
import { IAuthUseCase } from '../../application/interface/api/iauth.usecase';

@Resolver(UserDto)
export class AuthResolver {
  constructor(
    private readonly authUseCase: IAuthUseCase,
    private readonly logger: ILogger,
  ) {}

  @Mutation(() => UserDto)
  async signUp(@Args('registerUser') registerUser: UserDto) {
    return this.authUseCase.signup(registerUser);
  }

  // @UseGuards(AuthGuard('local')) //either use this guard
  @UseGuards(LocalAuthGuard)
  @Query(() => UserDto)
  async login(@Context() context, @Args('request') request: LoginUser) {
    return this.authUseCase.login(request);
  }

  @UseGuards(AccessTokenGuard)
  @Query(() => MyCodingText)
  async authenticate(@Context() context, @Args('request') request: JWTAuth) {
    const text: MyCodingText = {
      content: 'Happy Coding!',
    };

    return text;
  }

  @UseGuards(RefreshTokenGuard)
  @Mutation(() => UserDto)
  async refresh(@Context() context) {
    this.logger.debug('refresh');
    const refreshToken = context.req.user['refreshToken'];

    return await this.authUseCase.refresh(refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @Mutation(() => TokenDto)
  async logout(@Context() context) {
    this.logger.debug('logout');
    if (context.req?.user?.id) {
      return await this.authUseCase.logout(context.req.user.id);
    }
  }
}
