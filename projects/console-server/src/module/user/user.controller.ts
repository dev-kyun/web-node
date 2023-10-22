import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { CreateUserRequestDto, UserHttpSpec, UserId, UserResponse } from '@web-node/common';
import { UserService } from './user.service';

@Controller(UserHttpSpec.controller.path)
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  @Get(UserHttpSpec.findUserById.path)
  // @UseGuard(JwtGuard)
  async findUser(
    @Param('userId') userId: UserId, //
    // @User() user: UserPayload,
  ): Promise<UserResponse> {
    // if (userId !== user.userId) {
    //   throw new HttpException(`This user is not same with request user. user: ${userId}`, HttpStatus.UNAUTHORIZED);
    // }
    const rv = await this.userService.findUser(userId);
    return rv;
  }

  @Post(UserHttpSpec.createUser.path)
  async createUser(@Body() body: CreateUserRequestDto): Promise<UserResponse> {
    const rv = await this.userService.createUser(body);
    return rv;
  }
}
