import { Exclude } from 'class-transformer';
import { ColumnTemplate } from './util/decorators';
import {
  OrganizationAndUserAndOrganizationRolePropCamel,
  OrganizationAndUserAndOrganizationRolePropSnake,
  ORGANIZATION_AND_USER_AND_ORGANIZATION_ROLE_TABLE_NAME,
  UserId,
  UserModel,
  UserPropSnake,
  USER_TABLE_NAME,
} from '@web-node/common';
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Organization } from './organization.entity';
import { OrganizationAndUserAndOrganizationRole } from './organization-and-user-and-organization-role.entity';

@Entity(USER_TABLE_NAME)
export class User extends BaseEntity implements UserModel {
  @PrimaryGeneratedColumn('uuid', { name: UserPropSnake.user_id })
  userId!: UserId;

  @Column({ type: 'character varying', name: UserPropSnake.email, unique: true, nullable: false })
  email!: string;

  @Exclude()
  @Column({ type: 'character varying', name: UserPropSnake.password, nullable: true })
  password!: string | null;

  @Column({ type: 'character varying', name: UserPropSnake.name, nullable: false })
  name!: string;

  @ColumnTemplate.CreateDate(UserPropSnake.created_at)
  createdAt!: Date;

  @ColumnTemplate.UpdateDate(UserPropSnake.updated_at)
  updatedAt!: Date;

  @ColumnTemplate.DeleteDate(UserPropSnake.deleted_at)
  deletedAt!: Date | null;

  @ManyToMany(() => Organization, { createForeignKeyConstraints: false })
  @JoinTable({
    name: ORGANIZATION_AND_USER_AND_ORGANIZATION_ROLE_TABLE_NAME,
    inverseJoinColumn: {
      name: OrganizationAndUserAndOrganizationRolePropSnake.organization_id,
      referencedColumnName: OrganizationAndUserAndOrganizationRolePropCamel.organizationId,
    },
    joinColumn: {
      name: OrganizationAndUserAndOrganizationRolePropSnake.user_id,
      referencedColumnName: OrganizationAndUserAndOrganizationRolePropCamel.userId,
    },
  })
  organizations?: Organization[];

  @OneToMany(
    () => OrganizationAndUserAndOrganizationRole, //
    (organizationAndUserAndOrganizationRole) => organizationAndUserAndOrganizationRole.user,
    { cascade: ['soft-remove'] },
  )
  organizationAndUserAndOrganizationRoles?: OrganizationAndUserAndOrganizationRole[];
}
