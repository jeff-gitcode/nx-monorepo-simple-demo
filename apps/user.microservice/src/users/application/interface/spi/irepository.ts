// export const UserRepositorySymbol = Symbol('UserRepository');

import { SearchDTO, UserDto } from '../../../domain/dto/user.model';
import { RefreshToken } from '../../../domain/entities/user.entity';

// that class only can be extended
export abstract class IRepository<T> {
  abstract create(item: T): Promise<T>;

  abstract update(item: T): Promise<T>;

  abstract remove(id: string): Promise<T>;

  abstract findAll(payload?: string): Promise<T[]>;

  abstract findOneById(id: string): Promise<T>;

  abstract findOne(searchDto: SearchDTO): Promise<T>;
}

export abstract class IUserRepository extends IRepository<UserDto> {}

export abstract class IRefreshTokenRepository extends IRepository<RefreshToken> {}
