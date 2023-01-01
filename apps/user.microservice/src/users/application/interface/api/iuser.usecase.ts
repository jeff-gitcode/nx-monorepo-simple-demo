import { UserDto, SearchDTO } from '../../../domain/dto/user.model';

export abstract class IUserUseCase {
  abstract create(createUserDto: UserDto): Promise<UserDto>;

  abstract findAll(): Promise<UserDto[]>;

  abstract findOne(id: string): Promise<UserDto>;

  abstract findOneDynamic(searchDto: SearchDTO): Promise<UserDto>;

  abstract update(updateUserDto: UserDto): Promise<UserDto>;

  abstract remove(id: string);
}
