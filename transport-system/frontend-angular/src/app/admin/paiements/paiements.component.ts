import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaiementService } from '../../services/paiement.service';
import { Paiement } from '../../models/paiement.model';


@Component({
  standalone: true,
  selector: 'app-admin-paiements',
  imports: [CommonModule, RouterModule,],
  templateUrl: './paiements.component.html',
  styleUrls: ['./paiements.component.css']
})
export class AdminPaiementsComponent implements OnInit {
  paiements: Paiement[] = [];

  constructor(private paiementService: PaiementService) {}

  ngOnInit(): void {
    this.loadPaiements();
  }

  loadPaiements(): void {
    this.paiementService.getAll().subscribe({
      next: data => this.paiements = data,
      error: err => console.error('Erreur lors du chargement des paiements', err)
    });
  }
}
