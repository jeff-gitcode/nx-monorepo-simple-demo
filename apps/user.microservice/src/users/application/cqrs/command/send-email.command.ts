import { UserDto } from '../../../domain/dto/user.model';

export class SendEmailCommand {
  constructor(public readonly payload: UserDto) {}
}
