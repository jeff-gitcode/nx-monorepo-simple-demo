import { LoginUser, UserDTO } from '../../../domain/user';

export abstract class IAuthUseCase {
  abstract signUp(registerUser: UserDTO): void;
  abstract login(request: LoginUser): unknown;
  abstract refresh(): void;
  abstract logout(): void;
  abstract isLoggedIn(): boolean;
  abstract getToken(): string | null;
}
