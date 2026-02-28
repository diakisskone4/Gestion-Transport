import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservationService, Reservation } from '../../services/reservation.service';

@Component({
  standalone: true,
  selector: 'app-client-reservations',
  imports: [CommonModule, FormsModule],
  templateUrl: './reservations.component.html'
})
export class ClientReservationsComponent implements OnInit {

  reservations: Reservation[] = [];

  seatNumber: number = 1;     // ✅ nombre choisi par le client
  tripId: number = 1;         // ⚠️ à remplacer par le trajet sélectionné

  constructor(
    private service: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.getMesReservations().subscribe({
      next: data => this.reservations = data,
      error: err => console.error(err)
    });
  }

  reserver(): void {
    if (this.seatNumber < 1) {
      alert('Nombre de places invalide');
      return;
    }

    this.service.reserver(this.tripId, this.seatNumber).subscribe({
      next: () => {
        alert('Réservation effectuée');
        this.load(); // 🔄 rafraîchir la liste
      },
      error: err => console.error(err)
    });
  }

  payer(id?: number): void {
    if (!id) return;
    this.router.navigate(['/client/paiement', id]);
  }
}