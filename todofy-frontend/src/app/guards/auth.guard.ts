import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isSignedIn = localStorage.getItem('my_app_token');

  if (!isSignedIn) {
    router.navigate(['/sign-in']);
    return false;
  }
  return true;
};
