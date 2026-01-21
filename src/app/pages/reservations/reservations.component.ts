import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationsService } from '../../core/services/reservations.service';

@Component({
  standalone: true,
  selector: 'app-reservations',
  imports: [CommonModule],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  reservations: any[] = [];

  constructor(private service: ReservationsService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(data => {
      this.reservations = data;
    });
  }

  delete(id: number): void {
    if (confirm('Supprimer cette réservation ?')) {
      this.service.delete(id).subscribe(() => {
        this.reservations = this.reservations.filter(r => r.id !== id);
      });
    }
  }
}
