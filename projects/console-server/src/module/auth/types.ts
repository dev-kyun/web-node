import { UserId } from '@web-node/common';

export const USER_ACCESS_TOKEN_COOKIE_NAME = 'u_at';
export const USER_REFRESH_TOKEN_COOKIE_NAME = 'u_rt';
export const USER_ID_COOKIE_NAME = '_uid';

export const USER_ACCESS_TOKEN_EXPIRE_TIME = '10m';
export const USER_REFRESH_TOKEN_EXPIRE_TIME = 14; // 14 days

export interface UserAuthToken {
  accessToken: string;
  refreshToken: string;
}

export type UserPayload = {
  userId: UserId;
};

export type AuthPayLoad = UserPayload;

// user jwt key
export const USER_JWT_GUARD_KEY = 'USER_JWT_GUARD';

// organization role type
export const ORGANIZATION_ROLE_KEY = 'ORGANIZATION_ROLE';
export enum ORGANIZATION_ROLE {
  OWNER = 1,
  ADMIN = 2,
  MEMBER = 3,
}

// email verification type
export const EMAIL_VERIFICATION_KEY = 'EMAIL_VERIFICATION';
export enum EMAIL_VERIFICATION {
  VERIFIED = 'Verified',
  UNVERIFIED = 'Unverified',
}
