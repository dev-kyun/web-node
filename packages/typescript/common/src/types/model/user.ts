import { camelToSnakeCasePropertiesOf, propertiesOf } from '../../util/property-proxies';
import { UUID } from './common';
import { OrganizationModel } from './organization';
import { OrganizationAndUserAndOrganizationRoleModel } from './organization-and-user-and-organization-role';

export type UserId = UUID;
export const USER_TABLE_NAME = 'user';

export interface UserRelationTraits {
  organizationAndUserAndOrganizationRoles?: OrganizationAndUserAndOrganizationRoleModel[];
  organizations?: OrganizationModel[];
}

export interface UserModelTraits {
  userId: UserId;
  email: string;
  password?: string | null;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type UserModel = UserModelTraits & UserRelationTraits;
export const UserPropCamel = propertiesOf<UserModel>();
export const UserPropSnake = camelToSnakeCasePropertiesOf<UserModel>();
