import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReservationService, Reservation } from '../../services/reservation.service';

@Component({
  standalone: true,
  selector: 'app-client-reservations',
  imports: [CommonModule],
  templateUrl: './reservations.component.html'
})
export class ClientReservationsComponent implements OnInit {

  reservations: Reservation[] = [];

  constructor(
    private service: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.getMesReservations().subscribe({
      next: (data: Reservation[]) => this.reservations = data,
      error: err => console.error(err)
    });
  }

  payer(id?: number): void {
    if (!id) return;
    this.router.navigate(['/client/paiement', id]);
  }
}
