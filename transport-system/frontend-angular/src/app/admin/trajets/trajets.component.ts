import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TrajetService } from '../../services/trajet.service';
import { Trajet } from '../../models/trajet.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-trajets',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './trajets.component.html'
})
export class AdminTrajetsComponent implements OnInit {

  trajets: Trajet[] = [];

  // formulaire
  form: Trajet = {
    villeDepart: '',
    villeArrivee: '',
    heureDepart: '',
    prix: 0
  };

  isEdit = false;
  editId?: number;

  constructor(private trajetService: TrajetService) {}

  ngOnInit(): void {
    this.loadTrajets();
  }

  loadTrajets(): void {
    this.trajetService.getAll().subscribe({
      next: data => this.trajets = data,
      error: err => console.error(err)
    });
  }

  submit(): void {
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
    this.form = { ...trajet };
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
      villeDepart: '',
      villeArrivee: '',
      heureDepart: '',
      prix: 0
    };
  }
}
