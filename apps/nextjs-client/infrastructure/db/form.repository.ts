import { inject, injectable } from 'inversify';
import { IFormRepository } from '../../application/interface/spi/iform.repository';
import { TYPES } from '../../application/interface/types';
import { IFetchService } from '../service/fetch.service';

// import formData from './form.json';

@injectable()
export class FormRepository implements IFormRepository {
  private baseURL = 'http://localhost:3000/jsonForm';

  constructor(
    @inject(TYPES.FetchService)
    private readonly fetchService: IFetchService
  ) {}

  async getForm(): Promise<any> {
    return await this.fetchService.get(this.baseURL);
  }
  // async getForm(): Promise<any> {
  //   return formData;
  // }
}
