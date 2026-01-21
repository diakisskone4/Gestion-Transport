import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule],
  template: `
    <section class="home">
      <h1>Bienvenue sur la plateforme Transport</h1>
      <p>
        Réservez vos trajets, gérez les véhicules, compagnies et paiements
        simplement.
      </p>

      <div class="actions">
        <a routerLink="/reservations">Voir les réservations</a>
        <a routerLink="/bookings">Voir les bookings</a>
      </div>
    </section>
  `,
  styles: [`
    .home {
      padding: 40px;
      text-align: center;
    }
    .actions a {
      margin: 10px;
      padding: 10px 20px;
      background: #2563eb;
      color: #fff;
      text-decoration: none;
      border-radius: 4px;
      display: inline-block;
    }
  `]
})
export class HomeComponent {}
