import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { TrajetService } from '../../services/trajet.service';
import { Trajet } from '../../models/trajet.model';

@Component({
  selector: 'app-admin-trajets',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './trajets.component.html',
  styleUrls: ['./trajets.component.css']
})
export class AdminTrajetsComponent implements OnInit {
  // Données
  trajets: Trajet[] = [];
  cars: any[] = [];

  // État du formulaire
  form: Trajet = {
    departure: '',
    destination: '',
    departure_time: '',
    price: 0,
    car_id: undefined
  };

  // États
  isEdit = false;
  editId?: number;
  submitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private trajetService: TrajetService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadTrajets();
    this.loadCars();
  }

  // =========================
  // CHARGEMENTS
  // =========================
  loadTrajets(): void {
    this.errorMessage = '';
    
    this.trajetService.getAll()
      .pipe(
        catchError(err => {
          console.error('Erreur chargement trajets:', err);
          this.errorMessage = 'Impossible de charger les trajets. Veuillez réessayer.';
          return of([]);
        })
      )
      .subscribe({
        next: (data) => {
          this.trajets = data;
        }
      });
  }

  loadCars(): void {
    this.http.get<any[]>('http://127.0.0.1:8000/api/cars/')
      .pipe(
        catchError(err => {
          console.error('Erreur chargement voitures:', err);
          this.errorMessage = 'Impossible de charger les véhicules.';
          return of([]);
        })
      )
      .subscribe({
        next: (data) => {
          this.cars = data;
          console.log('Véhicules chargés:', data); // Pour déboguer
        }
      });
  }

  // =========================
  // VALIDATION
  // =========================
  validateForm(): boolean {
    if (!this.form.departure?.trim()) {
      this.errorMessage = 'La ville de départ est requise';
      return false;
    }
    if (!this.form.destination?.trim()) {
      this.errorMessage = "La ville d'arrivée est requise";
      return false;
    }
    if (!this.form.departure_time) {
      this.errorMessage = "L'heure de départ est requise";
      return false;
    }
    if (!this.form.price || this.form.price <= 0) {
      this.errorMessage = 'Le prix doit être supérieur à 0';
      return false;
    }
    if (!this.form.car_id) {
      this.errorMessage = 'Veuillez sélectionner un véhicule';
      return false;
    }
    return true;
  }

  // =========================
  // CRUD
  // =========================
  submit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.validateForm()) {
      return;
    }

    this.submitting = true;

    if (this.isEdit && this.editId) {
      this.trajetService.update(this.editId, this.form)
        .pipe(
          catchError(err => {
            console.error('Erreur mise à jour:', err);
            this.errorMessage = 'Erreur lors de la mise à jour du trajet';
            return of(null);
          })
        )
        .subscribe((response) => {
          this.submitting = false;
          if (response !== null) {
            this.successMessage = 'Trajet mis à jour avec succès !';
            this.reset();
            this.loadTrajets();
          }
        });
    } else {
      this.trajetService.create(this.form)
        .pipe(
          catchError(err => {
            console.error('Erreur création:', err);
            this.errorMessage = "Erreur lors de la création du trajet";
            return of(null);
          })
        )
        .subscribe((response) => {
          this.submitting = false;
          if (response !== null) {
            this.successMessage = 'Trajet créé avec succès !';
            this.reset();
            this.loadTrajets();
          }
        });
    }
  }

  edit(trajet: Trajet): void {
    this.isEdit = true;
    this.editId = trajet.id;
    this.errorMessage = '';
    this.successMessage = '';

    let formattedDate = '';
    if (trajet.departure_time) {
      formattedDate = trajet.departure_time.slice(0, 16);
    }

    this.form = {
      departure: trajet.departure || '',
      destination: trajet.destination || '',
      departure_time: formattedDate,
      price: trajet.price || 0,
      car_id: trajet.car?.id
    };

    setTimeout(() => {
      const formElement = document.querySelector('form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }

  delete(id?: number): void {
    if (!id) return;

    if (confirm('Êtes-vous sûr de vouloir supprimer ce trajet ? Cette action est irréversible.')) {
      this.trajetService.delete(id)
        .pipe(
          catchError(err => {
            console.error('Erreur suppression:', err);
            this.errorMessage = 'Erreur lors de la suppression du trajet';
            return of(null);
          })
        )
        .subscribe(() => {
          this.successMessage = 'Trajet supprimé avec succès !';
          this.loadTrajets();
        });
    }
  }

  reset(): void {
    this.isEdit = false;
    this.editId = undefined;
    this.errorMessage = '';
    
    this.form = {
      departure: '',
      destination: '',
      departure_time: '',
      price: 0,
      car_id: undefined
    };
  }

  // =========================
  // UTILITAIRES
  // =========================
  getCarDisplay(car: any): string {
    if (!car) return 'Non assigné';
    return `${car.number || 'N/A'} (${car.seats || '?'} places)`;
  }

  formatDate(date: string): string {
    if (!date) return '';
    try {
      return new Date(date).toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return date;
    }
  }

  getTodayTrajetsCount(): number {
    const today = new Date().toDateString();
    return this.trajets.filter(t => {
      try {
        const trajetDate = new Date(t.departure_time).toDateString();
        return trajetDate === today;
      } catch {
        return false;
      }
    }).length;
  }
}