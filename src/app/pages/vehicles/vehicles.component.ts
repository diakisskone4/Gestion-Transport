import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiclesService } from '../../core/services/vehicles.service';

@Component({
  standalone: true,
  selector: 'app-vehicles',
  imports: [CommonModule],
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

  vehicles: any[] = [];

  constructor(private service: VehiclesService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(data => {
      this.vehicles = data;
    });
  }

  delete(id: number): void {
    if (confirm('Supprimer ce véhicule ?')) {
      this.service.delete(id).subscribe(() => {
        this.vehicles = this.vehicles.filter(v => v.id !== id);
      });
    }
  }
}
