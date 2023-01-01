import { IUserRepository } from './irepository';

export abstract class IDataService {
  abstract users: IUserRepository;
}
