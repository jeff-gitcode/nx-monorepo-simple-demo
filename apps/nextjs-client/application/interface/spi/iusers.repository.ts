import { UserDTO } from '../../../domain/user';

export interface IUserRepository {
  getAll(): Promise<UserDTO[]>;
  getById(id: number): Promise<UserDTO>;
  create(params: UserDTO): Promise<any>;
  update(id: number, params: UserDTO): Promise<any>;
  delete(id: number): Promise<any>;
}
