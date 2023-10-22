import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { CreateOrganizationRequestDto, OrganizationHttpSpec, OrganizationId, OrganizationPropCamel, OrganizationResponse, UpdateOrganizationRequestDto } from '@web-node/common';
import { DataSource } from 'typeorm';
import { OrganizationPermission, User } from '../auth/decorators';
import { ORGANIZATION_ROLE, UserPayload } from '../auth/types';
import { OrganizationService } from './organization.service';

@Controller(OrganizationHttpSpec.controller.path)
export class OrganizationController {
  constructor(
    @Inject(OrganizationService)
    private organizationService: OrganizationService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  @Post('')
  // @EmailVerification(EMAIL_VERIFICATION.VERIFIED)
  async createOrganization(@User() userPayload: UserPayload, @Body() dto: CreateOrganizationRequestDto): Promise<OrganizationResponse> {
    const rv = this.dataSource.manager.transaction(async (manager) => {
      const org = await this.organizationService.createOrganization(manager, userPayload.userId, dto);
      return org;
    });
    return rv;
  }

  @Get(OrganizationHttpSpec.findOrgnizationById.path)
  @OrganizationPermission(ORGANIZATION_ROLE.MEMBER)
  async findOrganizationByOrganizationId(
    @User() userPayload: UserPayload,
    @Param(OrganizationPropCamel.organizationId) organizationId: OrganizationId,
  ): Promise<OrganizationResponse> {
    const rv = await this.organizationService.findOrganizationByOrganizationId(organizationId);
    return rv;
  }

  @Patch(':organizationId')
  @OrganizationPermission(ORGANIZATION_ROLE.ADMIN)
  async updateOrganization(
    @User() userPayload: UserPayload,
    @Param(OrganizationPropCamel.organizationId) organizationId: OrganizationId,
    @Body() dto: UpdateOrganizationRequestDto,
  ): Promise<OrganizationResponse> {
    const rv = await this.organizationService.updateOrganization(organizationId, dto);
    return rv;
  }
}
