import { applyDecorators, createParamDecorator, ExecutionContext, SetMetadata, UseGuards } from '@nestjs/common';
import { OrganizationGuard } from './guard/organization.guard';
import { UserJwtGuard } from './guard/user-jwt.guard';
import { ORGANIZATION_ROLE, ORGANIZATION_ROLE_KEY, UserPayload } from './types';

export function OrganizationPermission(roleType: ORGANIZATION_ROLE): PropertyDecorator {
  return applyDecorators(SetMetadata(ORGANIZATION_ROLE_KEY, roleType), UseGuards(UserJwtGuard), UseGuards(OrganizationGuard));
}

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext): UserPayload => {
  const request = ctx.switchToHttp().getRequest<{ user: UserPayload }>();
  return request.user;
});

// export function EmailVerification(verificationType: EMAIL_VERIFICATION): PropertyDecorator {
//   return applyDecorators(SetMetadata(EMAIL_VERIFICATION_KEY, verificationType), UseGuards(UserJwtGuard), UseGuards(EmailVerificationGuard));
// }

// export function GoogleOAuth(): PropertyDecorator {
//   return applyDecorators(UseGuards(AuthGuard(GOOGLE)));
// }
