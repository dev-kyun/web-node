import { OrganizationId, OrganizationRoleId, OrganizationRoleModel, OrganizationRolePropSnake, ORGANIZATION_ROLE_TABLE_NAME } from '@web-node/common';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrganizationAndUserAndOrganizationRole } from './organization-and-user-and-organization-role.entity';
import { ColumnTemplate } from './util/decorators';

@Entity(ORGANIZATION_ROLE_TABLE_NAME)
export class OrganizationRole extends BaseEntity implements OrganizationRoleModel {
  @PrimaryGeneratedColumn('increment', { type: 'int', name: OrganizationRolePropSnake.organization_role_id, unsigned: true })
  organizationRoleId!: OrganizationRoleId;

  @ColumnTemplate.RelationUuid(OrganizationRolePropSnake.organization_id, true)
  organizationId!: OrganizationId | null;

  @Column({ type: 'character varying', name: OrganizationRolePropSnake.name, nullable: false })
  name!: string;

  @ColumnTemplate.CreateDate(OrganizationRolePropSnake.created_at)
  createdAt!: Date;

  @ColumnTemplate.UpdateDate(OrganizationRolePropSnake.updated_at)
  updatedAt!: Date;

  @ColumnTemplate.DeleteDate(OrganizationRolePropSnake.deleted_at)
  deletedAt!: Date | null;

  @OneToMany(() => OrganizationAndUserAndOrganizationRole, (orgUserRole) => orgUserRole.organizationRole, { createForeignKeyConstraints: false })
  organizationAndUserAndOrganizationRoles?: OrganizationAndUserAndOrganizationRole[];
}
