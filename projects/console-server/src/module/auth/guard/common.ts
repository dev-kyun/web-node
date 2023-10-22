import { ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import {
  OrganizationAndUserAndOrganizationRolePropCamel,
  OrganizationAndUserAndOrganizationRolePropSnake,
  OrganizationId,
  UserId,
  UserPropCamel,
  UserPropSnake,
} from '@web-node/common';
import { OrganizationAndUserAndOrganizationRole } from 'src/db/entity/organization-and-user-and-organization-role.entity';
import { OrganizationRole } from 'src/db/entity/organization-role.entity';
import { EntityManager } from 'typeorm';
import { AuthPayLoad, EMAIL_VERIFICATION, ORGANIZATION_ROLE } from '../types';

export interface LogInfo {
  controller: string;
  method: string;
  handler: string;
  roleType: ORGANIZATION_ROLE | EMAIL_VERIFICATION | null;
  payload: AuthPayLoad;
}

export function printLog(ctx: ExecutionContext, guardName: string, roleType: ORGANIZATION_ROLE | EMAIL_VERIFICATION | null) {
  const logInfo: LogInfo = {
    controller: ctx.getClass().name,
    method: ctx.switchToHttp().getRequest<{ method: string }>().method,
    handler: ctx.getHandler().name,
    roleType: roleType,
    payload: ctx.switchToHttp().getRequest<{ user: AuthPayLoad }>().user,
  };
  console.log(`${guardName}: `, { logInfo });
  // logger.info(`${guardName}: `, { logInfo });
}

export function getOrganizationIdFromRequest(ctx: ExecutionContext): OrganizationId {
  const orgIdParam = ctx.switchToHttp().getRequest<{ params: { organizationId: OrganizationId } }>().params.organizationId;
  const orgIdQuery = ctx.switchToHttp().getRequest<{ query: { organizationId: OrganizationId } }>().query.organizationId;
  const orgIdBody = ctx.switchToHttp().getRequest<{ body: { organizationId: OrganizationId } }>().body.organizationId;
  const orgIds = [orgIdParam, orgIdQuery, orgIdBody].filter((id): id is OrganizationId => id !== undefined);
  if (orgIds.length === 0) {
    throw new HttpException(`Guard Error. organizationId is required`, HttpStatus.BAD_REQUEST);
  } else if (orgIds.length > 1) {
    throw new HttpException(`Guard Error. organizationId is duplicated`, HttpStatus.BAD_REQUEST);
  }
  return orgIds[0];
}

export module UserPermission {
  export async function getOrganizationUserRole(manager: EntityManager, organizationId: OrganizationId, userId: UserId): Promise<OrganizationRole> {
    const orgIdCamel = OrganizationAndUserAndOrganizationRolePropCamel.organizationId;
    const orgIdSnake = OrganizationAndUserAndOrganizationRolePropSnake.organization_id;
    const orgUserRole = await manager
      .getRepository(OrganizationAndUserAndOrganizationRole) //
      .createQueryBuilder('orgUserRole')
      .innerJoinAndSelect(`orgUserRole.${OrganizationAndUserAndOrganizationRolePropCamel.organizationRole}`, `organizationRole`)
      .where(`orgUserRole.${UserPropSnake.user_id} = :${UserPropCamel.userId}`, { userId })
      .andWhere(`orgUserRole.${orgIdSnake} = :${orgIdCamel}`, { organizationId })
      .getOne();

    if (!orgUserRole) {
      // logger.error(`The user is not a member of the organization. userId: ${userId}, organizationId: ${organizationId}`);
      throw new HttpException(`The user is not a member of the organization.`, HttpStatus.UNAUTHORIZED);
    }
    const organizationRole = orgUserRole.organizationRole;
    if (!organizationRole) {
      // logger.error(`The user is not a member of the organization. userId: ${userId}, organizationId: ${organizationId}`);
      throw new HttpException(`The user is not a member of the organization.`, HttpStatus.UNAUTHORIZED);
    }

    return organizationRole;
  }

  export function checkOrganizationRolePermission(checkOrgRoleType: ORGANIZATION_ROLE, requiredOrgRoleType: ORGANIZATION_ROLE): boolean {
    return checkOrgRoleType <= requiredOrgRoleType;
  }

  export function validateOrganizationRolePermission(organizationRole: OrganizationRole, controllerRoleType: ORGANIZATION_ROLE): boolean {
    const orgRoleId = organizationRole.organizationRoleId;

    if (controllerRoleType > ORGANIZATION_ROLE.MEMBER || orgRoleId > ORGANIZATION_ROLE.MEMBER) {
      // logger.error(`not implemented. OrganizationGaurd()`);
      throw new HttpException(`not implemented`, HttpStatus.NOT_IMPLEMENTED);
    }

    const isValid = UserPermission.checkOrganizationRolePermission(orgRoleId, controllerRoleType);
    if (!isValid) {
      // logger.error(`The user is not a ${requiredRoleName} role of the organization.`);
      // throw new HttpException(`The user is not a ${requiredRoleName} role of the organization.`, HttpStatus.UNAUTHORIZED);
      return false;
    }
    return true;
  }
}
