import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaiementService } from '../../services/paiement.service';
import { Paiement } from '../../models/paiement.model';

@Component({
  standalone: true,
  selector: 'app-admin-paiements',
  imports: [CommonModule, RouterModule],
  templateUrl: './paiements.component.html',
  styleUrls: ['./paiements.component.css']
})
export class AdminPaiementsComponent implements OnInit {

  paiements: Paiement[] = [];
  message = '';
  loading = false;

  constructor(private paiementService: PaiementService) {}

  ngOnInit(): void {
    this.loadPaiements();
  }

  loadPaiements(): void {
  this.loading = true;
  this.message = '';

  this.paiementService.getAllAdmin().subscribe({
    next: (data) => {
      this.paiements = data;
      this.loading = false;

      if (data.length === 0) {
        this.message = 'Aucun paiement enregistré.';
      }
    },
    error: (err) => {
      console.error(err);
      this.message =
        err.status === 401
          ? 'Accès non autorisé ❌'
          : 'Erreur lors du chargement des paiements ❌';
      this.loading = false;
    }
  });
}

  // 🔑 Optimisation Angular (*ngFor)
  trackById(index: number, item: Paiement): number {
    return item.id ?? index;
  }
}