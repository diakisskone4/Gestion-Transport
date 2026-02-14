import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '../core/layouts/admin-layout/admin-layout.component';


export const ADMIN_ROUTES: Routes = [

  {
    path: '',
    component: AdminLayoutComponent,
    children: [

      {
        path: '',
        loadComponent: () =>
          import('./dashboard/dashboard.component')
            .then(m => m.AdminDashboardComponent)
      },

      {
        path: 'trajets',
        loadComponent: () =>
          import('./trajets/trajets.component')
            .then(m => m.AdminTrajetsComponent)
      },

      {
        path: 'reservations',
        loadComponent: () =>
          import('./reservations/reservations.component')
            .then(m => m.AdminReservationsComponent)
      },

      {
        path: 'paiements',
        loadComponent: () =>
          import('./paiements/paiements.component')
            .then(m => m.AdminPaiementsComponent)
      },

      {
        path: 'chat',
        loadComponent: () =>
          import('./chat/chat.component')
            .then(m => m.AdminChatComponent)
      }

    ]
  }

];
