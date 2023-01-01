import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { UserDto } from '../../domain/dto/user.model';
import { UserValidationPipe } from '../../application/validation/user-validation-pipe';
import { ILogger } from '../../application/interface/ilogger';
import { IUserUseCase } from '../../application/interface/api/iuser.usecase';

@Controller('api')
// @ApiTags('users')
export class UsersController {
  constructor(
    private readonly userUseCase: IUserUseCase,
    private readonly logger: ILogger,
  ) {}

  @Post('add')
  @UsePipes(new UserValidationPipe())
  async create(@Body() createUserDto: UserDto): Promise<UserDto | Error> {
    this.logger.debug('create user');
    return await this.userUseCase.create(createUserDto);
  }

  @Get('getAll')
  async findAll(): Promise<UserDto[]> {
    return await this.userUseCase.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: UserDto,
  })
  async findOne(@Param('id') id: string) {
    return await this.userUseCase.findOne(id);
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UserDto,
  ): Promise<UserDto | Error> {
    return await this.userUseCase.update(updateUserDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.userUseCase.remove(id);
  }
}
