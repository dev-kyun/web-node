import { HttpException, HttpStatus, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { CreateUserRequestDto, UserId, UserPropCamel, UserPropSnake, UserResponse } from '@web-node/common';
import { User } from 'src/db/entity/user.entity';
import { Brackets, DataSource, DeepPartial, EntityManager, In } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async findUser(userId: UserId): Promise<UserResponse> {
    const user = await this.dataSource
      .getRepository(User) //
      .createQueryBuilder('user')
      .where(`user.${UserPropSnake.user_id} = :${UserPropCamel.userId}`, { userId })
      .getOne();

    if (!user) {
      throw new HttpException(`User not found : ${userId}`, HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async createUser(dto: CreateUserRequestDto): Promise<UserResponse> {
    //TODO:
    const newUser = this.dataSource.getRepository(User).create({
      email: dto.email,
      name: dto.name,
      password: dto.password,
    });

    const rv = await this.dataSource.getRepository(User).save(newUser);
    return rv;
  }
}
