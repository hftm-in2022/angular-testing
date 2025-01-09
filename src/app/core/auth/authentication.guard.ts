import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { hasRole } from './jwt';
import { AuthStateService } from './auth-state.service';

export const isAuthenticatedGuard: CanActivateFn = () => {
  const authService = inject(AuthStateService);
  const loginResponse = authService.loginResponse();

  if (
    loginResponse.isAuthenticated &&
    hasRole('user', loginResponse.accessToken)
  ) {
    return true;
  } else {
    authService.authorize();
    return false;
  }
};
