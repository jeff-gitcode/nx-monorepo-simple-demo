export class UserDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accessToken?: string;
  refreshToken?: string;

  constructor() {
    this.id = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
    this.accessToken = '';
    this.refreshToken = '';
  }
}

export class UserInput {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accessToken?: string;
  refreshToken?: string;

  constructor() {
    this.id = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
    this.accessToken = '';
    this.refreshToken = '';
  }
}

export class LoginUser {
  username!: string;
  password!: string;

  constructor() {
    this.username = '';
    this.password = '';
  }
}

export class LoginUserDTO {
  email!: string;
  password!: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}
