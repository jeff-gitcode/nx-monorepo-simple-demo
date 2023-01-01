import { inject, injectable } from 'inversify';
import { IFormUseCase } from './interface/api/iform.usecase';

import { IFormService } from './interface/spi/iform.service';
import { TYPES } from './interface/types';

@injectable()
class FormUseCase implements IFormUseCase {
  constructor(
    @inject(TYPES.FormService) private readonly formService: IFormService
  ) {}

  async getForm(): Promise<any> {
    return await this.formService.getForm();
  }
}

export default FormUseCase;
