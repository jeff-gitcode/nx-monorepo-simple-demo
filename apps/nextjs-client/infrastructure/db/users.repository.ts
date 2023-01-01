import { inject, injectable } from 'inversify';
import path from 'path';
import { IUserRepository } from '../../application/interface/spi/iusers.repository';
import { TYPES } from '../../application/interface/types';

import { UserDTO } from '../../domain/user';
import { IFetchService } from '../service/fetch.service';
import { IFileStreamService } from '../service/file.service';

import usersData from './users.json';

@injectable()
export class UserRepository implements IUserRepository {
  private baseURL = 'http://localhost:3000/users';
  constructor(
    @inject(TYPES.FetchService)
    private readonly fetchService: IFetchService
  ) {}

  async getAll(): Promise<UserDTO[]> {
    return await this.fetchService.get(this.baseURL);
  }

  async getById(id: number): Promise<UserDTO> {
    return await this.fetchService.get(`${this.baseURL}/${id}`);
  }
  async create(params: UserDTO): Promise<any> {
    return await this.fetchService.post(this.baseURL, params);
  }
  async update(id: number, params: UserDTO): Promise<any> {
    return await this.fetchService.put(`${this.baseURL}/${id}`, params);
  }
  async delete(id: number): Promise<any> {
    return await this.fetchService._delete(`${this.baseURL}/${id}`);
  }
}

@injectable()
export class UserOldRepository implements IUserRepository {
  constructor(
    @inject(TYPES.FileStreamService)
    private readonly fileStreamService: IFileStreamService
  ) {}

  private users = usersData as UserDTO[];

  async getAll(): Promise<UserDTO[]> {
    return this.users;
  }

  async getById(id: number): Promise<any> {
    return this.users.find((x) => x.id.toString() === id.toString());
  }
  async create(params: UserDTO): Promise<any> {
    // validate
    if (this.users.find((x) => x.email === params.email))
      throw `User with the email ${params.email} already exists`;

    // generate new user id
    params.id = this.users.length
      ? Math.max(...this.users.map((x) => x.id)) + 1
      : 1;

    // add and save user
    this.users.push(params);
    await this.saveData();
  }

  async update(id: number, params: UserDTO): Promise<any> {
    const current = this.users.find((x) => x.id.toString() === id.toString());

    // validate
    if (
      params.email !== params.email &&
      this.users.find((x) => x.email === params.email)
    )
      throw `User with the email ${params.email} already exists`;

    // update and save
    Object.assign(current ?? {}, params);
    await this.saveData();
  }

  async delete(id: number): Promise<any> {
    // filter out deleted user and save
    this.users = this.users.filter((x) => x.id.toString() !== id.toString());
    await this.saveData();
  }

  async saveData() {
    const content = JSON.stringify(this.users, null, 4);
    const filePath = path.join(
      process.cwd(),
      // 'infrastructure/db',
      `${process.env.NEXT_PUBLIC_DB_PATH}`,
      'users.json'
    );

    await this.fileStreamService.writeFileSync(filePath, content);
    // await fs.promises.writeFile(filePath, content);
  }
}
