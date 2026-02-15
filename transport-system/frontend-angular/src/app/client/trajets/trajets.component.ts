import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TrajetService } from '../../services/trajet.service';
import { ReservationService } from '../../services/reservation.service';
import { Trajet } from '../../models/trajet.model';

@Component({
  standalone: true,
  selector: 'app-client-trajets',
  imports: [CommonModule],
  templateUrl: './trajets.component.html'
})
export class ClientTrajetsComponent implements OnInit {

  trajets: Trajet[] = [];

  constructor(
    private trajetService: TrajetService,
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.trajetService.getAll().subscribe({
      next: (data: Trajet[]) => this.trajets = data,
      error: (err: unknown) => console.error(err)
    });
  }

  // ✅ LA RÉSERVATION SE FAIT ICI
  reserver(tripId: number): void {
    this.reservationService.reserver(tripId).subscribe({
      next: () => {
        // après succès → page mes réservations
        this.router.navigate(['/client/reservations']);
      },
      error: (err: unknown) => {
        console.error('Erreur réservation', err);
      }
    });
  }
}
