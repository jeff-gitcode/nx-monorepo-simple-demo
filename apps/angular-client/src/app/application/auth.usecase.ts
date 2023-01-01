import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser, UserDTO } from '../domain/user';
import { IAuthUseCase } from './interface/api/iauth.usecase';
import { IAuthService } from './interface/spi/iauth.service';

@Injectable()
export class AuthUseCase implements IAuthUseCase {
  constructor(private authService: IAuthService) {}
  login(request: LoginUser): Observable<UserDTO> {
    return this.authService.login(request);
  }

  signUp(params: UserDTO): void {
    return this.authService.signUp(params);
  }

  refresh(): void {
    return this.authService.refresh();
  }

  logout(): void {
    return this.authService.logout();
  }
}
