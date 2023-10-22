import { IsString } from 'class-validator';
import { ControllerMethodSpec, ControllerSpec, DefaultPathProvider } from '../../util/specs';
import { UserId, UserModel } from '../model/user';

export class UserResponse implements Pick<UserModel, 'userId' | 'email' | 'name'> {
  userId!: UserId;
  email!: string;
  name!: string;
}

export class CreateUserRequestDto implements Pick<UserModel, 'email' | 'name' | 'password'> {
  @IsString()
  email!: string;

  @IsString()
  name!: string;

  @IsString()
  password!: string;
}

const UserController = new ControllerSpec({
  path: '/users',
});

export const UserHttpSpec = {
  controller: UserController,

  findUserById: new ControllerMethodSpec({
    controllerSpec: UserController,
    method: 'GET',
    path: '/:userId',
    pathProvider: class {
      constructor(readonly userId: UserId) {}
    },
    responseBody: UserResponse,
  }),

  createUser: new ControllerMethodSpec({
    controllerSpec: UserController,
    method: 'POST',
    path: '/',
    pathProvider: DefaultPathProvider,
    requestBody: CreateUserRequestDto,
    responseBody: UserResponse,
  }),
};
