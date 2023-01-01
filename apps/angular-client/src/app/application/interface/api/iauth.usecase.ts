import { Observable } from 'rxjs';
import { LoginUser, UserDTO } from '../../../domain/user';

export abstract class IAuthUseCase {
  abstract login(request: LoginUser): Observable<UserDTO>;
  abstract signUp(params: UserDTO): void;
  abstract refresh(): void;
  abstract logout(): void;
}
