import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { UserDto } from '../../domain/dto/user.model';
import { userSchema } from './user-schema';

@Injectable()
export class UserValidationPipe implements PipeTransform {
  // constructor(private schema: ObjectSchema) {}

  transform(value: UserDto, metadata: ArgumentMetadata) {
    const result = userSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
