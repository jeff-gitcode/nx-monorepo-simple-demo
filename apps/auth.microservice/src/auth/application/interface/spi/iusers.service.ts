import { UserDto, SearchDTO } from '../../../domain/dto/user.model';

export abstract class IUserService {
  abstract create(item: UserDto): Promise<UserDto>;

  abstract update(item: UserDto): Promise<UserDto>;

  abstract remove(id: string): Promise<UserDto>;

  abstract findAll(payload?: string): Promise<UserDto[]>;

  abstract findOneById(id: string): Promise<UserDto>;

  abstract findOne(searchDto: SearchDTO): Promise<UserDto>;
}
