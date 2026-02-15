import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReservationService, Reservation } from '../../services/reservation.service';

@Component({
  standalone: true,
  selector: 'app-admin-reservations',
  imports: [CommonModule, RouterModule],
  templateUrl: './reservations.component.html'
})
export class AdminReservationsComponent implements OnInit {

  reservations: Reservation[] = [];

  constructor(private service: ReservationService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (data: Reservation[]) => {
        this.reservations = data;
      },
      error: (err: unknown) => {
        console.error('Erreur lors du chargement des réservations', err);
      }
    });
  }
}
