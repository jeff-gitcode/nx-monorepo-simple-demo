import { TokenOptions } from '../../../domain/entities/user.entity';

export abstract class ITokenService {
  abstract sign(tokenOptions: TokenOptions);

  abstract verify(tokenOptions: TokenOptions);

  abstract signOff(tokenOptions: TokenOptions);
}
