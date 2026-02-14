import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then(m => m.LoginComponent)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then(m => m.RegisterComponent)
  },

  {
    path: 'client',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./client/client-module').then(m => m.CLIENT_ROUTES)
  },

  {
  path: 'admin',
  canActivate: [authGuard, adminGuard],
  loadChildren: () =>
    import('./admin/admin-module').then(m => m.ADMIN_ROUTES)
}

];
