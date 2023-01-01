import { Observable } from 'rxjs';
import { LoginUser, UserDTO } from '../../../domain/user';

export abstract class IAuthRepository {
  abstract login(request: LoginUser): Observable<UserDTO>;
  abstract signUp(params: UserDTO): Observable<any>;
  abstract refresh(): Observable<UserDTO>;
  abstract logout(): Observable<any>;
}
