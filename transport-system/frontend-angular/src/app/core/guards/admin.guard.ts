import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const adminGuard = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.token()) {
    router.navigate(['/login']);
    return false;
  }

  try {
    const user = await auth.me().toPromise();
    if (user.is_staff) {
      return true;
    } else {
      router.navigate(['/client']);
      return false;
    }
  } catch {
    auth.logout();
    router.navigate(['/login']);
    return false;
  }
};
;
