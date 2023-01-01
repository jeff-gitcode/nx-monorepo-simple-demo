export class Token {
  accessToken?: string;
  refreshToken?: string;

  constructor() {
    this.accessToken = '';
    this.refreshToken = '';
  }
}
