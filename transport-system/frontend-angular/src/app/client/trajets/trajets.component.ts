import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TrajetService } from '../../services/trajet.service';
import { Trajet } from '../../models/trajet.model';

@Component({
  standalone: true,
  selector: 'app-client-trajets',
  imports: [CommonModule],
  templateUrl: './trajets.component.html'
})
export class ClientTrajetsComponent implements OnInit {

  trajets: Trajet[] = [];

  constructor(
    private trajetService: TrajetService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.trajetService.getAll().subscribe(data => this.trajets = data);
  }

  reserver(id: number) {
    this.router.navigate(['/client/reservations'], { queryParams: { trajetId: id }});
  }
}
