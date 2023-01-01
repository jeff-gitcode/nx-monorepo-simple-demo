import { inject, injectable } from 'inversify';
import Cookies from 'js-cookie';
import { Observable } from 'rxjs';
import { IAuthService } from '../../application/interface/spi/iauth.service';
import { TYPES } from '../../application/interface/types';
import { LoginUser, UserDTO } from '../../domain/user';
import { IFetchObservableService } from './fetch.observable.service';
import { IFetchService } from './fetch.service';

@injectable()
export class AuthService implements IAuthService {
  private tokenKey = process.env.NEXT_PUBLIC_TOKEN;
  private url = process.env.NEXT_PUBLIC_AUTH_URL;
  constructor(
    @inject(TYPES.FetchService) private readonly fetchService: IFetchService,
    @inject(TYPES.FetchObservableService)
    private readonly fetchObservableService: IFetchObservableService
  ) {}

  signUp(registerUser: UserDTO): void {
    // this.authGraphQLService.findAll().subscribe((token: any) => {
    //   localStorage.setItem(this.tokenKey, token);
    // });
    // return await this.fetchService.post(`${this.url}/register`, registerUser);

    this.fetchObservableService
      .post(`${this.url}/register`, registerUser)
      .subscribe(() => {
        // localStorage.setItem(this.tokenKey, token.accessToken);
        // this.router.navigate(['/login']);
      });
  }

  login(request: LoginUser): Observable<UserDTO> {
    // const response = await this.fetchService.post(`${this.url}/login`, request);
    // localStorage.setItem(this.tokenKey, response.accessToken);

    const userObserable = new Observable<UserDTO>((observer) => {
      try {
        this.fetchObservableService
          .post(`${this.url}/login`, request)
          .subscribe({
            next: (token) => {
              Cookies.set(this.tokenKey, JSON.stringify(token));

              observer.next(token);

              observer.complete();
            },
            error: (err) => {
              observer.error(err);
            },
          });
      } catch (error) {
        console.log(
          '🚀 ~ file: auth.service.ts:54 ~ AuthService ~ userObserable ~ error',
          error
        );
        throw new Error(error);
      }
    });

    return userObserable;
  }

  refresh(): void {
    // const response = await this.fetchService.get(`${this.url}/refresh`);
    // localStorage.setItem(this.tokenKey, response.accessToken);

    this.fetchObservableService
      .get(`${this.url}/refresh`)
      .subscribe((token: any) => {
        Cookies.set(this.tokenKey, JSON.stringify(token));
        // localStorage.setItem(this.tokenKey, token.accessToken);
      });
  }

  logout(): void {
    // const response = await this.fetchService.get(`${this.url}/logout`);
    // localStorage.removeItem(this.tokenKey);

    this.fetchObservableService
      .get(`${this.url}/logout`)
      .subscribe((token: any) => {
        Cookies.remove(this.tokenKey);
        // localStorage.removeItem(this.tokenKey);
        // this.router.navigate(['/login']);
      });
  }

  isLoggedIn(): boolean {
    // const token = localStorage.getItem(this.tokenKey);
    const token = Cookies.get(this.tokenKey);
    return token != null && token.length > 0;
  }

  getToken(): string | null {
    // return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
    return this.isLoggedIn() ? Cookies.get(this.tokenKey) : null;
  }
}
