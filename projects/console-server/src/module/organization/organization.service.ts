import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  CreateOrganizationRequestDto,
  OrganizationId,
  OrganizationPropCamel,
  OrganizationPropSnake,
  OrganizationResponse,
  UpdateOrganizationRequestDto,
  UserId,
} from '@web-node/common';
import crypto from 'crypto';
import { OrganizationAndUserAndOrganizationRole } from 'src/db/entity/organization-and-user-and-organization-role.entity';
import { Organization } from 'src/db/entity/organization.entity';
import { User } from 'src/db/entity/user.entity';
import { DataSource, DeepPartial, EntityManager, In } from 'typeorm';
import { v4 } from 'uuid';
import { ORGANIZATION_ROLE } from '../auth/types';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async findOrganizationByOrganizationId(organizationId: OrganizationId): Promise<OrganizationResponse> {
    const organization = await this.dataSource
      .getRepository(Organization)
      .createQueryBuilder('organization')
      .where(`organization.${OrganizationPropSnake.organization_id} = :${OrganizationPropCamel.organizationId}`, { organizationId })
      .getOne();

    if (!organization) {
      throw new HttpException(`Organization not found : ${organizationId}`, HttpStatus.NOT_FOUND);
    }

    return organization;
  }

  async createOrganization(manager: EntityManager, userId: UserId, dto: CreateOrganizationRequestDto): Promise<OrganizationResponse> {
    const orgData = manager.getRepository(Organization).create({ name: dto.name });
    const org = await manager.getRepository(Organization).save(orgData);
    const organizationId = org.organizationId;

    const user = await manager.getRepository(User).findOne({ where: { userId } });
    if (!user) {
      throw new HttpException(`user not found. userId: ${userId}`, HttpStatus.NOT_FOUND);
    }
    // mapping - organization - user - role
    const userData = manager
      .getRepository(OrganizationAndUserAndOrganizationRole) //
      .create({ organizationId, userId, organizationRoleId: ORGANIZATION_ROLE.OWNER });
    await manager.getRepository(OrganizationAndUserAndOrganizationRole).save(userData);

    return org;
  }

  async updateOrganization(organizationId: OrganizationId, dto: UpdateOrganizationRequestDto): Promise<OrganizationResponse> {
    const organization = await this.dataSource.getRepository(Organization).findOne({
      where: { organizationId },
    });

    if (!organization) {
      throw new HttpException('organization not found', HttpStatus.NOT_FOUND);
    }

    const newData = Object.assign(organization, dto);

    const rv = await this.dataSource.transaction(async (manager) => {
      const org = await manager.getRepository(Organization).save(newData);
      return org;
    });

    return {
      organizationId: rv.organizationId,
      name: rv.name,
    };
  }
}
