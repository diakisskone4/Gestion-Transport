import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TrajetService } from '../../services/trajet.service';
import { Trajet } from '../../models/trajet.model';

@Component({
  standalone: true,
  selector: 'app-client-trajets',
  imports: [CommonModule],
  templateUrl: './trajets.component.html',
  styleUrls: ['./trajets.component.css']
})
export class ClientTrajetsComponent implements OnInit {
  trajets: Trajet[] = [];
  errorMessage = '';

  constructor(
    private trajetService: TrajetService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTrajets();
  }

  loadTrajets(): void {
    this.trajetService.getAll().subscribe({
      next: (data) => {
        this.trajets = data;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Erreur chargement trajets:', err);
        this.errorMessage = 'Impossible de charger les trajets. Veuillez réessayer.';
      }
    });
  }

  allerAReservation(tripId: number): void {
    this.router.navigate(['/client/reservations', tripId]);
  }

  // ✅ Méthodes sécurisées pour le template
  getSeatsCount(car: any): number {
    return car?.seats || 0;
  }

  getSeatsClass(car: any): string {
    const seats = this.getSeatsCount(car);
    if (seats === 0) return 'danger';
    if (seats < 5) return 'warning';
    return '';
  }

  hasVehicle(car: any): boolean {
    return !!car?.number;
  }

  getVehicleNumber(car: any): string {
    return car?.number || 'Non assigné';
  }
}