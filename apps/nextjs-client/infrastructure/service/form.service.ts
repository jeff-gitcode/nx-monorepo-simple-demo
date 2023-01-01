import { inject, injectable } from 'inversify';
import { IFormService } from '../../application/interface/spi/iform.service';

import { TYPES } from '../../application/interface/types';
import { IFetchService } from './fetch.service';

@injectable()
export class FormService implements IFormService {
  private readonly baseUrl: string = `${process.env.NEXT_PUBLIC_URL}/form`;

  constructor(
    @inject(TYPES.FetchService) private fetchService: IFetchService
  ) {}

  async getForm(): Promise<any> {
    return await this.fetchService.get(this.baseUrl);
  }
}
