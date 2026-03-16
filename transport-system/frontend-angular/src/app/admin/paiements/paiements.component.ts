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

  constructor(private paiementService: PaiementService) {}

  ngOnInit(): void {
    this.loadPaiements();
  }

  loadPaiements(): void {
    this.message = '';

    this.paiementService.getAllAdmin().subscribe({
      next: (data) => {
        this.paiements = data;
        if (data.length === 0) {
          this.message = 'Aucun paiement enregistré.';
        }
      },
      error: (err) => {
        console.error('Erreur chargement paiements:', err);
        this.message = err.status === 401
          ? 'Accès non autorisé ❌'
          : 'Erreur lors du chargement des paiements ❌';
        this.paiements = [];
      }
    });
  }

  getTotalMontant(): number {
    return this.paiements.reduce((total, p) => total + (p.montant || 0), 0);
  }

  getPaiementsPayes(): number {
    return this.paiements.filter(p => p.statut === 'PAYE').length;
  }

  trackById(index: number, item: Paiement): number {
    return item.id ?? index;
  }
}