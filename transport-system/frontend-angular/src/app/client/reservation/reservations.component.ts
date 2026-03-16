import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservationService, Reservation } from '../../services/reservation.service';

@Component({
  standalone: true,
  selector: 'app-client-reservations',
  imports: [CommonModule, FormsModule],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ClientReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  seatNumber: number = 1;
  tripId: number = 1; // À remplacer par le trajet sélectionné
  errorMessage = '';
  successMessage = '';

  constructor(
    private service: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.getMesReservations().subscribe({
      next: (data) => {
        this.reservations = data;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Erreur chargement réservations:', err);
        this.errorMessage = 'Impossible de charger vos réservations.';
      }
    });
  }

  reserver(): void {
    if (this.seatNumber < 1) {
      this.errorMessage = 'Le nombre de places doit être au moins 1';
      return;
    }

    if (this.seatNumber > 10) {
      this.errorMessage = 'Maximum 10 places par réservation';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.service.reserver(this.tripId, this.seatNumber).subscribe({
      next: () => {
        this.successMessage = 'Réservation effectuée avec succès !';
        this.seatNumber = 1; // Reset
        this.load(); // Rafraîchir la liste
      },
      error: (err) => {
        console.error('Erreur réservation:', err);
        this.errorMessage = 'Erreur lors de la réservation. Veuillez réessayer.';
      }
    });
  }

  payer(id?: number): void {
    if (!id) return;
    this.router.navigate(['/client/paiement', id]);
  }
}