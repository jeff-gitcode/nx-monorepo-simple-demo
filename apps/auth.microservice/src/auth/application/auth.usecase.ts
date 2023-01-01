import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Search } from 'proto/users';
import {
  SearchDTO,
  TokenDto,
  UserDto,
  LoginUser,
} from '../domain/dto/user.model';

import { SignType, TokenOptions } from '../domain/entities/user.entity';
import { IAuthUseCase } from './interface/api/iauth.usecase';
import { ITokenUseCase } from './interface/api/itoken.usecase';
import { IUserUseCase } from './interface/api/iuser.usecase';
import { IBcryptService } from './interface/spi/ibcypt.service';
import { IConfigService } from './interface/iconfig.service';
import { ILogger } from './interface/ilogger';

@Injectable()
export class AuthUseCase implements IAuthUseCase {
  constructor(
    private readonly userUseCase: IUserUseCase,
    private readonly tokenUseCase: ITokenUseCase,
    private readonly configService: IConfigService,
    // private readonly tokenService: ITokenService,
    private readonly bcryptService: IBcryptService,
    private readonly logger: ILogger,
  ) {}

  public async signup(newUser: UserDto) {
    this.logger.debug('register');

    let user: UserDto;

    try {
      newUser.password = await this.bcryptService.hash(newUser.password);

      user = await this.userUseCase.create(newUser);

      return user;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }

    // able to provide the token when signup as well
    // if (user) {
    //   const token = await this.getAuthToken(user.id);

    //   const result: UserDto = {
    //     ...user,
    //     token: token,
    //   };

    //   return result;
    // }
  }

  public async login(request: LoginUser) {
    this.logger.debug('login');

    const payload = { email: request.username, password: request.password };

    const searchDto: SearchDTO = {
      key: 'email',
      value: payload.email,
    };

    const user = await this.userUseCase.findOneDynamic(searchDto);

    const tokenOptions: TokenOptions = {
      payload: { id: user.id },
      signType: SignType.Login,
    };

    const tokens = await this.tokenUseCase.sign(tokenOptions);

    const result: UserDto = {
      ...user,
      ...tokens,
    };
    return result;
  }

  public async logout(id: string) {
    const tokenOptions: TokenOptions = {
      payload: { id },
    };

    this.tokenUseCase.signOff(tokenOptions);

    const token: TokenDto = {
      accessToken: '',
      refreshToken: '',
    };

    return token;
  }

  public async refresh(token: string) {
    // const decoded = await this.getRefreshToken(token);

    // if (!decoded) {
    //   return undefined;
    // }
    let tokenOptions: TokenOptions = {
      token,
      secret: await this.configService.getRefreshSecret(),
    };

    const decoded = await this.tokenUseCase.verify(tokenOptions);

    const user = await this.userUseCase.findOne(decoded.userId.toString());

    if (!user) {
      return undefined;
    }

    tokenOptions = {
      payload: { id: user.id },
    };

    const tokens = await this.tokenUseCase.sign(tokenOptions);

    const result: UserDto = {
      ...user,
      ...tokens,
    };

    return result;
  }

  public async getAuthUser(email: string, password: string) {
    this.logger.debug('getAuthUser');

    try {
      const searchDto: Search = {
        key: 'email',
        value: email,
      };
      this.logger.debug(JSON.stringify(searchDto));
      const user = await this.userUseCase.findOneDynamic(searchDto);

      this.logger.debug('return user');
      this.logger.debug(JSON.stringify(user));
      await this.checkPassword(user, password);

      return user;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private async checkPassword(user: UserDto, password: string) {
    const isPassword = await this.bcryptService.compare(
      password,
      user.password,
    );

    if (!isPassword) {
      throw new HttpException('password is incorrect', HttpStatus.BAD_REQUEST);
    }
  }
}
