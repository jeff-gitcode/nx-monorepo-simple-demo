import { UserDto } from '../../../domain/dto/user.model';

export abstract class IEmailService {
  abstract send(createUserDto: UserDto): Promise<void>;
}
