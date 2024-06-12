import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  return JSON.parse(window.localStorage.getItem('UserInfo') || '{}').role.name === 'admin';
};
