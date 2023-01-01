import { inject, injectable } from 'inversify';

import { UserDTO } from '../domain/user';
import { IUserUseCase } from './interface/api/iusers.usecase';
import { IUserService } from './interface/spi/iusers.service';
import { TYPES } from './interface/types';

@injectable()
class UserUseCase implements IUserUseCase {
  constructor(
    @inject(TYPES.UserService) private readonly userService: IUserService
  ) {}

  async getAll(): Promise<UserDTO[]> {
    return await this.userService.getAll();
  }
  async getById(id: string): Promise<UserDTO> {
    return await this.userService.getById(id);
  }
  async create(params: UserDTO): Promise<any> {
    return await this.userService.create(params);
  }
  async update(id: string, params: UserDTO): Promise<any> {
    return await this.userService.update(id, params);
  }
  async delete(id: string): Promise<any> {
    return await this.userService.delete(id);
  }
}

export default UserUseCase;
