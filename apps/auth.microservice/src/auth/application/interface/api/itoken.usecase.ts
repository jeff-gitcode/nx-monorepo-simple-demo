import { TokenOptions } from '../../../domain/entities/user.entity';

export abstract class ITokenUseCase {
  abstract sign(tokenOptions: TokenOptions);
  abstract verify(tokenOptions: TokenOptions);
  abstract signOff(tokenOptions: TokenOptions);
}
