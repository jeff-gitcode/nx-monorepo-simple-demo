import { IRefreshTokenRepository } from './irepository';
import { IUserService } from './iusers.service';

export abstract class IDataService {
  abstract users: IUserService;

  abstract refreshTokens: IRefreshTokenRepository;
}
