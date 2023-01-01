import { UserDto } from '../../../domain/dto/user.model';

export abstract class IAuthUseCase {
  abstract signup(newUser: UserDto);

  abstract login(user: any);

  abstract logout(id: string);

  abstract refresh(token: string);

  abstract getAuthUser(email: string, password: string);
}