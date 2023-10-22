import { camelToSnakeCasePropertiesOf, propertiesOf } from '../../util/property-proxies';
import { UUID } from './common';
import { OrganizationId } from './organization';

export const ORGANIZATION_ROLE_TABLE_NAME = 'organization_role';

export type OrganizationRoleId = number;

export interface OrganizationRoleBaseTraits {
  organizationRoleId: OrganizationRoleId;
  organizationId: OrganizationId | null;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type OrganizationRoleModel = OrganizationRoleBaseTraits;
export const OrganizationRolePropCamel = propertiesOf<OrganizationRoleModel>();
export const OrganizationRolePropSnake = camelToSnakeCasePropertiesOf<OrganizationRoleModel>();
