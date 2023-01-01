import { Observable } from 'rxjs';
import { LoginUser, UserDTO } from '../../../domain/user';

export abstract class IAuthService {
  abstract signUp(registerUser: UserDTO): void;
  abstract login(request: LoginUser): Observable<UserDTO>;
  abstract refresh(): void;
  abstract logout(): void;
  abstract isLoggedIn(): boolean;
  abstract getToken(): string | null;
}
