import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';

import { SearchDTO, UserDto } from '../../domain/dto/user.model';
import { UserValidationPipe } from '../../application/validation/user-validation-pipe';
import { ILogger } from '../../application/interface/ilogger';
import { AccessTokenGuard } from '../../application/auth/guard/access-token.guard';
import { IUserUseCase } from '../../application/interface/api/iuser.usecase';

@Resolver(UserDto)
export class UsersResolver {
  constructor(
    private readonly userUseCase: IUserUseCase,
    private readonly logger: ILogger,
  ) {}

  @Mutation(() => UserDto)
  // @UsePipes(new UserValidationPipe())
  async createUser(
    @Args('createUser', new UserValidationPipe()) createUser: UserDto,
  ): Promise<UserDto | Error> {
    this.logger.debug('createUser');
    return await this.userUseCase.create(createUser);
  }

  @Query(() => [UserDto])
  async findAll(): Promise<UserDto[] | Error> {
    this.logger.debug('findAll');
    return await this.userUseCase.findAll();
  }

  // @UseGuards(AccessTokenGuard)
  @Query(() => UserDto)
  async findOne(@Args('id') id: string) {
    this.logger.debug('findOne');
    return await this.userUseCase.findOne(id);
  }

  @Query(() => UserDto)
  async findOneDynamic(@Args('searchDto') searchDto: SearchDTO) {
    this.logger.debug('findOneDynamic');
    return await this.userUseCase.findOneDynamic(searchDto);
  }

  @Mutation(() => UserDto)
  async update(
    @Args('id') id: string,
    @Args('updateUser', new UserValidationPipe()) updateUser: UserDto,
  ): Promise<UserDto | Error> {
    this.logger.debug('update');
    return await this.userUseCase.update(updateUser);
  }

  @Mutation(() => UserDto)
  async remove(@Args('id') id: string): Promise<UserDto> {
    this.logger.debug('remove');
    return await this.userUseCase.remove(id);
  }
}
