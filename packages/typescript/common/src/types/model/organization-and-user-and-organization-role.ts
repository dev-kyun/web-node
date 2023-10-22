import { OrganizationId, OrganizationModel } from './organization';
import { UserId, UserModel } from './user';
import { OrganizationRoleId, OrganizationRoleModel } from './organization-role';
import { camelToSnakeCasePropertiesOf, propertiesOf } from '../../util/property-proxies';

export const ORGANIZATION_AND_USER_AND_ORGANIZATION_ROLE_TABLE_NAME = 'organization_and_user_and_organization_role';

export interface OrganizationAndUserAndOrganizationRoleRelationTraits {
  user?: UserModel;
  organization?: OrganizationModel;
  organizationRole?: OrganizationRoleModel;
}

export interface OrganizationAndUserAndOrganizationRoleModelTraits {
  organizationId: OrganizationId;
  userId: UserId;
  organizationRoleId: OrganizationRoleId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type OrganizationAndUserAndOrganizationRoleModel = OrganizationAndUserAndOrganizationRoleModelTraits & OrganizationAndUserAndOrganizationRoleRelationTraits;
export const OrganizationAndUserAndOrganizationRolePropCamel = propertiesOf<OrganizationAndUserAndOrganizationRoleModel>();
export const OrganizationAndUserAndOrganizationRolePropSnake = camelToSnakeCasePropertiesOf<OrganizationAndUserAndOrganizationRoleModel>();
