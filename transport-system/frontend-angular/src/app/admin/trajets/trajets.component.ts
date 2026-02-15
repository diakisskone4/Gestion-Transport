import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TrajetService } from '../../services/trajet.service';
import { Trajet } from '../../models/trajet.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-trajets',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './trajets.component.html'
})
export class AdminTrajetsComponent implements OnInit {

  trajets: Trajet[] = [];

  // formulaire STRICTEMENT aligné avec Django
  form: Trajet = {
    departure: '',
    destination: '',
    departure_time: '',
    price: 0,
    car_id: undefined as any   // ❗ PAS 0
  };

  // véhicules depuis l’API
  cars: any[] = [];

  isEdit = false;
  editId?: number;

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
    this.trajetService.getAll().subscribe({
      next: data => this.trajets = data,
      error: err => console.error(err)
    });
  }

  loadCars(): void {
    this.http.get<any[]>('http://127.0.0.1:8000/api/cars/')
      .subscribe({
        next: data => this.cars = data,
        error: err => console.error('Erreur chargement voitures', err)
      });
  }

  // =========================
  // CRUD
  // =========================
  submit(): void {

    // 🔒 sécurité minimale
    if (!this.form.car_id) {
      alert('Veuillez sélectionner un véhicule');
      return;
    }

    if (this.isEdit && this.editId) {
      this.trajetService.update(this.editId, this.form).subscribe(() => {
        this.reset();
        this.loadTrajets();
      });
    } else {
      this.trajetService.create(this.form).subscribe(() => {
        this.reset();
        this.loadTrajets();
      });
    }
  }

  edit(trajet: Trajet): void {
    this.isEdit = true;
    this.editId = trajet.id;

    this.form = {
      departure: trajet.departure,
      destination: trajet.destination,
      departure_time: trajet.departure_time.slice(0, 16), // ✅ datetime-local
      price: trajet.price,
      car_id: trajet.car?.id
    };
  }

  delete(id?: number): void {
    if (!id) return;

    if (confirm('Voulez-vous supprimer ce trajet ?')) {
      this.trajetService.delete(id).subscribe(() => {
        this.loadTrajets();
      });
    }
  }

  reset(): void {
    this.isEdit = false;
    this.editId = undefined;

    this.form = {
      departure: '',
      destination: '',
      departure_time: '',
      price: 0,
      car_id: undefined as any
    };
  }
}
