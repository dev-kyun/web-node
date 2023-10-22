import { camelToSnakeCasePropertiesOf, propertiesOf } from '../../util/property-proxies';
import { UUID } from './common';
import { UserModel } from './user';
import { OrganizationAndUserAndOrganizationRoleModel } from './organization-and-user-and-organization-role';

export const ORGANIZATION_TABLE_NAME = 'organization';
export type OrganizationId = UUID;

export interface OrganizationRelationTraits {
  users?: UserModel[];
  organizationAndUserAndOrganizationRoles?: OrganizationAndUserAndOrganizationRoleModel[];
}

export interface OrganizationModelTraits {
  organizationId: OrganizationId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type OrganizationModel = OrganizationModelTraits & OrganizationRelationTraits;
export const OrganizationPropCamel = propertiesOf<OrganizationModel>();
export const OrganizationPropSnake = camelToSnakeCasePropertiesOf<OrganizationModel>();
