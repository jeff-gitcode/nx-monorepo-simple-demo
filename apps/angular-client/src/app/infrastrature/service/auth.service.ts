import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IAuthService } from '../../application/interface/spi/iauth.service';
import { LoginUser, UserDTO } from '../../domain/user';
import { IAuthGraphQLService } from './graphql.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  private tokenKey = 'token';
  constructor(
    private authGraphQLService: IAuthGraphQLService,
    private router: Router
  ) {}

  signUp(registerUser: UserDTO): void {
    // this.authGraphQLService.findAll().subscribe((token: any) => {
    //   localStorage.setItem(this.tokenKey, token);
    // });

    this.authGraphQLService.signUp(registerUser).subscribe((token: any) => {
      localStorage.setItem(this.tokenKey, token.accessToken);
      this.router.navigate(['/login']);
    });
  }

  login(request: LoginUser): Observable<UserDTO> {
    const userObserable = new Observable<UserDTO>((observer) => {
      this.authGraphQLService.login(request).subscribe(
        (token: any) => {
          localStorage.setItem(this.tokenKey, token.accessToken);

          observer.next(token);

          observer.complete();

          this.router.navigate(['/']);
        },
        (error) => {
          if (localStorage.getItem(this.tokenKey)) {
            localStorage.removeItem(this.tokenKey);
          }
          observer.error(error);
        }
      );
    });

    return userObserable;
  }

  refresh(): void {
    this.authGraphQLService.refresh().subscribe(
      (token: any) => {
        localStorage.setItem(this.tokenKey, token.accessToken);
      },
      (error) => {
        if (localStorage.getItem(this.tokenKey)) {
          localStorage.removeItem(this.tokenKey);
          this.router.navigate(['/login']);
        }
      }
    );
  }

  logout(): void {
    this.authGraphQLService.logout().subscribe(
      (token: any) => {
        localStorage.removeItem(this.tokenKey);
        this.router.navigate(['/login']);
      },
      (error) => {
        if (localStorage.getItem(this.tokenKey)) {
          localStorage.removeItem(this.tokenKey);
          this.router.navigate(['/login']);
        }
      }
    );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}
