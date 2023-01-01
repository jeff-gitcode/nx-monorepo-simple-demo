export class User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  readonly id: string;
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly token: string;
}

export class LoginDTO {
  readonly email: string;
  readonly password: string;
}

export class RefreshToken {
  id?: string;
  readonly userId: string;
}

export class TokenOptions {
  readonly payload?: any;

  readonly token?: string;
  readonly secret?: string;
  readonly expiresIn?: string;
  readonly signType?: SignType;
}

export enum SignType {
  Login,
  Refresh,
}

export enum Operation {
  create = 'create',
  delete = 'remove',
  update = 'update',

  findOne = 'findOne',
  findOneById = 'findOneById',
  findAll = 'findAll',
}

export enum DBEntity {
  users = 'users',
  refreshTokens = 'refreshTokens',
}

export type CRUD = {
  readonly operation: string;
  readonly entity: string;
};

export enum MicroServiceProvider {
  userService = 'userService',
  authService = 'authService',
}
