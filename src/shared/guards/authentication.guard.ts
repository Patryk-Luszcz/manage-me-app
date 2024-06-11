import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authenticationGuard: CanActivateFn = () => {
  return inject(CookieService).get('AuthorizationToken') ? true : false;
};
