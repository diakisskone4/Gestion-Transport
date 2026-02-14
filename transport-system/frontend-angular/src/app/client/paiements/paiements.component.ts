import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaiementService } from '../../services/paiement.service';
import { Paiement } from '../../models/paiement.model';




@Component({
  selector: 'app-client-paiements',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './paiements.component.html'
})
export class ClientPaiementsComponent implements OnInit {

  reservationId!: number;
  paiement?: Paiement;
  montant = 0;
  message = '';

  constructor(
    private paiementService: PaiementService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reservationId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPaiement();
  }

  loadPaiement(): void {
    this.paiementService.getByReservation(this.reservationId).subscribe({
      next: (data: Paiement) => this.paiement = data,
      error: () => this.paiement = undefined
    });
  }

  payer(): void {
    this.paiementService.payer(this.reservationId, this.montant).subscribe({
      next: (data: Paiement) => {
        this.paiement = data;
        this.message = 'Paiement effectué avec succès ✅';
      },
      error: () => {
        this.message = 'Erreur lors du paiement ❌';
      }
    });
  }
}
