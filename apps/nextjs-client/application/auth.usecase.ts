import { inject, injectable } from 'inversify';
import { lastValueFrom } from 'rxjs';

import { LoginUser, UserDTO } from '../domain/user';
import { IAuthUseCase } from './interface/api/iauth.usecase';
import { IAuthService } from './interface/spi/iauth.service';
import { TYPES } from './interface/types';
@injectable()
class AuthUseCase implements IAuthUseCase {
  constructor(
    @inject(TYPES.AuthService) private readonly authService: IAuthService
  ) {}

  signUp(registerUser: UserDTO): void {
    return this.authService.signUp(registerUser);
  }
  async login(request: LoginUser): Promise<UserDTO> {
    return await lastValueFrom(this.authService.login(request));
  }
  refresh(): void {
    return this.authService.refresh();
  }
  logout(): void {
    return this.authService.logout();
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  getToken(): string {
    return this.authService.getToken();
  }
}

export default AuthUseCase;
