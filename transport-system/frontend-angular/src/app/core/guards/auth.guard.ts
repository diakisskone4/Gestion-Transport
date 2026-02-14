import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const authGuard = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.token()) {
    router.navigate(['/login']);
    return false;
  }

  try {
    await auth.me().toPromise();
    return true;
  } catch {
    auth.logout();
    router.navigate(['/login']);
    return false;
  }
};
;
