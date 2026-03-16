import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReservationService, Reservation } from '../../services/reservation.service';

@Component({
  standalone: true,
  selector: 'app-admin-reservations',
  imports: [CommonModule, RouterModule],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class AdminReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  errorMessage = '';

  constructor(private service: ReservationService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.service.getAll().subscribe({
      next: (data: Reservation[]) => {
        this.reservations = data;
        this.errorMessage = '';
      },
      error: (err: unknown) => {
        console.error('Erreur lors du chargement des réservations', err);
        this.errorMessage = 'Impossible de charger les réservations. Veuillez réessayer.';
        this.reservations = [];
      }
    });
  }
}