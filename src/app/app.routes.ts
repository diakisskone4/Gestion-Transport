import { Routes } from '@angular/router';

export const routes: Routes = [

  // =====================
  // HOME (PAGE D'ACCUEIL)
  // =====================
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component')
        .then(m => m.HomeComponent)
  },

  // =====================
  // RESERVATIONS
  // =====================
  {
    path: 'reservations',
    loadComponent: () =>
      import('./pages/reservations/reservations.component')
        .then(m => m.ReservationsComponent)
  },

  // =====================
  // BOOKINGS
  // =====================
  {
    path: 'bookings',
    loadComponent: () =>
      import('./pages/bookings/bookings.component')
        .then(m => m.BookingsComponent)
  },
  {
    path: 'bookings/new',
    loadComponent: () =>
      import('./pages/bookings/bookings-form.component')
        .then(m => m.BookingFormComponent)
  },
  {
    path: 'bookings/edit/:id',
    loadComponent: () =>
      import('./pages/bookings/bookings-form.component')
        .then(m => m.BookingFormComponent)
  },

  // =====================
  // VEHICLES
  // =====================
  {
    path: 'vehicles',
    loadComponent: () =>
      import('./pages/vehicles/vehicles.component')
        .then(m => m.VehiclesComponent)
  },
  {
    path: 'vehicles/new',
    loadComponent: () =>
      import('./pages/vehicles/vehicles-form.component')
        .then(m => m.VehicleFormComponent)
  },
  {
    path: 'vehicles/edit/:id',
    loadComponent: () =>
      import('./pages/vehicles/vehicles-form.component')
        .then(m => m.VehicleFormComponent)
  },

  // =====================
  // ROUTES
  // =====================
  {
    path: 'routes',
    loadComponent: () =>
      import('./pages/routes/routes.component')
        .then(m => m.RoutesComponent)
  },
  {
    path: 'routes/new',
    loadComponent: () =>
      import('./pages/routes/route-form.component')
        .then(m => m.RouteFormComponent)
  },
  {
    path: 'routes/edit/:id',
    loadComponent: () =>
      import('./pages/routes/route-form.component')
        .then(m => m.RouteFormComponent)
  },

  // =====================
  // COMPANIES
  // =====================
  {
    path: 'companies',
    loadComponent: () =>
      import('./pages/companies/companies.component')
        .then(m => m.CompaniesComponent)
  },
  {
    path: 'companies/new',
    loadComponent: () =>
      import('./pages/companies/companies-form.component')
        .then(m => m.CompanyFormComponent)
  },
  {
    path: 'companies/edit/:id',
    loadComponent: () =>
      import('./pages/companies/companies-form.component')
        .then(m => m.CompanyFormComponent)
  },

  // =====================
  // PAYMENTS
  // =====================
  {
    path: 'payments',
    loadComponent: () =>
      import('./pages/payments/payments.component')
        .then(m => m.PaymentsComponent)
  },
  {
    path: 'payments/new',
    loadComponent: () =>
      import('./pages/payments/payments-form.component')
        .then(m => m.PaymentFormComponent)
  },
  {
    path: 'payments/edit/:id',
    loadComponent: () =>
      import('./pages/payments/payments-form.component')
        .then(m => m.PaymentFormComponent)
  },

  // =====================
  // 404
  // =====================
  {
    path: '**',
    redirectTo: ''
  }
];
