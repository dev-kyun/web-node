import { UserAuthToken, UserPayload } from './types';

export function isUserAuthToken(obj: any): obj is UserAuthToken {
  return (
    typeof obj === 'object' && //
    typeof obj.accessToken === 'string' &&
    typeof obj.refreshToken === 'string'
  );
}

export function isUserPayload(payload: any): payload is UserPayload {
  return (
    typeof payload === 'object' && //
    payload !== null &&
    'userId' in payload
  );
}
