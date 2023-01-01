import { ArgumentMetadata, BadRequestException } from '@nestjs/common';

import { UserDto } from '../../domain/dto/user.model';
import { UserValidationPipe } from './user-validation-pipe';

describe('UserValidationPipe', () => {
  let validationPipe: UserValidationPipe;
  const metadata: ArgumentMetadata = {
    type: 'body',
    metatype: UserDto,
    data: '',
  };

  const user: UserDto = {
    id: '1',
    email: 'test@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    password: '1234',
    accessToken: '',
    refreshToken: '',
  };

  beforeEach(() => {
    validationPipe = new UserValidationPipe();
  });

  test('should pass when valid data', async () => {
    try {
      const actual = await validationPipe.transform(user, metadata);
      expect(actual).toEqual(user);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  test('should throw error what field invalid', async () => {
    user.email = 'email.com';

    try {
      await validationPipe.transform(user, metadata);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });
});
