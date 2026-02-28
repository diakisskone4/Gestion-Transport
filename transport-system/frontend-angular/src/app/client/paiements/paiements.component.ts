import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PaiementService } from '../../services/paiement.service';
import { ReservationService, Reservation } from '../../services/reservation.service';
import { Paiement } from '../../models/paiement.model';

@Component({
  selector: 'app-client-paiements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paiements.component.html'
})
export class ClientPaiementsComponent implements OnInit {

  reservationId!: number;
  reservation?: Reservation;
  paiement?: Paiement;

  montant = 0;          // affichage uniquement
  message = '';
  loading = false;      // 🔑 anti double clic / UX

  constructor(
    private paiementService: PaiementService,
    private reservationService: ReservationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.reservationId = idParam ? Number(idParam) : 0;

    if (!this.reservationId) {
      this.message = 'ID de réservation invalide ❌';
      return;
    }

    this.loadReservation();
    this.loadPaiement();
  }

  // 🔹 Charger la réservation
  loadReservation(): void {
    this.reservationService.getById(this.reservationId).subscribe({
      next: (res) => {
        this.reservation = res;
        this.montant = res.seat_number * res.trip.price;
      },
      error: () => {
        this.message = 'Réservation introuvable ❌';
      }
    });
  }

  // 🔹 Vérifier si déjà payé
  loadPaiement(): void {
    this.paiementService.getByReservation(this.reservationId).subscribe({
      next: (data) => this.paiement = data,
      error: (err) => {
        if (err.status === 404) {
          this.paiement = undefined; // pas encore payé
        } else {
          console.error(err);
          this.message = 'Erreur lors de la vérification du paiement ❌';
        }
      }
    });
  }

  // 🔹 Paiement
  payer(): void {
  if (this.loading) return;

  this.loading = true;
  this.message = 'Paiement en cours...';

  this.paiementService.payer(this.reservationId).subscribe({
    next: (data) => {
      this.paiement = data;
      this.message = 'Paiement effectué avec succès ✅';
      this.loading = false;
    },
    error: (err) => {
      console.error(err);

      if (err.status === 401) {
        this.message = 'Vous devez être connecté ❌';
      } else if (err.status === 400) {
        this.message = 'Paiement invalide ❌';
      } else {
        this.message = 'Erreur serveur ❌';
      }

      this.loading = false;
    }
  });
}
}