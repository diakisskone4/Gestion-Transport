import { Routes } from '@angular/router';

export const CLIENT_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component')
        .then(m => m.ClientDashboardComponent)
  },

  {
    path: 'trajets',
    loadComponent: () =>
      import('./trajets/trajets.component')
        .then(m => m.ClientTrajetsComponent)
  },

  {
    path: 'reservations',
    loadComponent: () =>
      import('./reservation/reservations.component')
        .then(m => m.ClientReservationsComponent)
  },

  {
    path: 'ticket/:id',
    loadComponent: () =>
      import('./ticket/ticket.component')
        .then(m => m.TicketComponent)
  },

  {
    path: 'chat',
    loadComponent: () =>
      import('./chat/chat.component')
        .then(m => m.ClientChatComponent)
  }
];
