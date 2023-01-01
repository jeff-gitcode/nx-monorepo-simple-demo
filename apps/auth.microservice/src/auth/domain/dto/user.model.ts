import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('UserInput')
export class UserDto {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  password: string;

  @Field({ nullable: false })
  firstName: string;

  @Field({ nullable: false })
  lastName: string;

  @Field({ nullable: true })
  accessToken: string;

  @Field({ nullable: true })
  refreshToken: string;
}

@ObjectType()
@InputType('LoginUser')
export class LoginUser {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: false })
  username: string;

  @Field({ nullable: false })
  password: string;
}

@ObjectType()
@InputType('JWTAuth')
export class JWTAuth {
  @Field({ nullable: true })
  id: string;
}

@ObjectType()
@InputType('MyCodingText', { isAbstract: true })
export class MyCodingText {
  @Field({ nullable: true })
  content: string;
}

@ObjectType()
@InputType('Deleted', { isAbstract: true })
export class Deleted {
  @Field({ nullable: true })
  deleted: boolean;
}

@ObjectType()
@InputType('TokenDto', { isAbstract: true })
export class TokenDto {
  @Field({ nullable: true })
  accessToken: string;
  @Field({ nullable: true })
  refreshToken: string;
}

@ObjectType()
@InputType('SearchDTO', { isAbstract: true })
export class SearchDTO {
  @Field({ nullable: false })
  readonly key: string;
  @Field({ nullable: false })
  readonly value: string;
}
