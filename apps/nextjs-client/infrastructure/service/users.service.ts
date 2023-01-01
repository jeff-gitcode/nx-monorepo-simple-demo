import { inject, injectable } from 'inversify';
import { lastValueFrom } from 'rxjs';

import { IUserService } from '../../application/interface/spi/iusers.service';
import { TYPES } from '../../application/interface/types';
import { UserDTO } from '../../domain/user';
import { IFetchObservableService } from './fetch.observable.service';
import { IFetchService } from './fetch.service';

@injectable()
export class UserService implements IUserService {
  private readonly baseUrl: string = `${process.env.NEXT_PUBLIC_URL}/users`;

  constructor(
    @inject(TYPES.FetchService) private readonly fetchService: IFetchService,
    @inject(TYPES.FetchObservableService)
    private readonly fetchObservableService: IFetchObservableService
  ) {}

  async getAll(): Promise<UserDTO[]> {
    // return await this.fetchService.get(this.baseUrl);
    return await lastValueFrom(this.fetchObservableService.get(this.baseUrl));
  }
  async getById(id: string): Promise<UserDTO> {
    return await lastValueFrom(
      this.fetchObservableService.get(`${this.baseUrl}/${id}`)
    );
  }
  async create(params: UserDTO): Promise<any> {
    return await lastValueFrom(
      this.fetchObservableService.post(this.baseUrl, params)
    );
  }
  async update(id: string, params: UserDTO): Promise<any> {
    return await lastValueFrom(
      this.fetchObservableService.put(`${this.baseUrl}/${id}`, params)
    );
  }
  async delete(id: string): Promise<any> {
    return await lastValueFrom(
      this.fetchObservableService._delete(`${this.baseUrl}/${id}`)
    );
  }
}
