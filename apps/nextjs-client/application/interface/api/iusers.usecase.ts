import { UserDTO } from '../../../domain/user';

export abstract class IUserUseCase {
  abstract getAll(): Promise<UserDTO[]>;
  abstract getById(id: string): Promise<UserDTO>;
  abstract create(params: UserDTO): Promise<any>;
  abstract update(id: string, params: UserDTO): Promise<any>;
  abstract delete(id: string): Promise<any>;
}
