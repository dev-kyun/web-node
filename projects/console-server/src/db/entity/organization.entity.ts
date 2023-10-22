import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {
  OrganizationId,
  OrganizationModel,
  OrganizationPropCamel,
  OrganizationPropSnake,
  ORGANIZATION_AND_USER_AND_ORGANIZATION_ROLE_TABLE_NAME,
  ORGANIZATION_TABLE_NAME,
  UserPropCamel,
  UserPropSnake,
} from '@web-node/common';
import { ColumnTemplate } from './util/decorators';
import { OrganizationAndUserAndOrganizationRole } from './organization-and-user-and-organization-role.entity';
import { User } from './user.entity';

@Entity(ORGANIZATION_TABLE_NAME)
export class Organization extends BaseEntity implements OrganizationModel {
  @PrimaryGeneratedColumn('uuid', { name: OrganizationPropSnake.organization_id })
  organizationId!: OrganizationId;

  @Column({ type: 'character varying', name: OrganizationPropSnake.name, nullable: false })
  name!: string;

  @ColumnTemplate.CreateDate(OrganizationPropSnake.created_at)
  createdAt!: Date;

  @ColumnTemplate.UpdateDate(OrganizationPropSnake.updated_at)
  updatedAt!: Date;

  @ColumnTemplate.DeleteDate(OrganizationPropSnake.deleted_at)
  deletedAt!: Date | null;

  @OneToMany(
    () => OrganizationAndUserAndOrganizationRole, //
    (organizationAndUserAndOrganizationRole) => organizationAndUserAndOrganizationRole.organization,
    { cascade: ['soft-remove'] },
  )
  organizationAndUserAndOrganizationRoles?: OrganizationAndUserAndOrganizationRole[];

  @ManyToMany(() => User, { createForeignKeyConstraints: false })
  @JoinTable({
    name: ORGANIZATION_AND_USER_AND_ORGANIZATION_ROLE_TABLE_NAME,
    inverseJoinColumn: {
      name: UserPropSnake.user_id,
      referencedColumnName: UserPropCamel.userId,
    },
    joinColumn: {
      name: OrganizationPropSnake.organization_id,
      referencedColumnName: OrganizationPropCamel.organizationId,
    },
  })
  users?: User[];
}
