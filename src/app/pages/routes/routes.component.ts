import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesService } from '../../core/services/routes.service';

@Component({
  standalone: true,
  selector: 'app-routes',
  imports: [CommonModule],
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit {

  routes: any[] = [];

  constructor(private service: RoutesService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(data => {
      this.routes = data;
    });
  }

  delete(id: number): void {
    if (confirm('Supprimer ce trajet ?')) {
      this.service.delete(id).subscribe(() => {
        this.routes = this.routes.filter(r => r.id !== id);
      });
    }
  }
}
