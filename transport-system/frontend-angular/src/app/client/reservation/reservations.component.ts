import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';

@Component({
  standalone: true,
  selector: 'app-client-reservations',
  imports: [CommonModule],
  templateUrl: './reservations.component.html'
})
export class ClientReservationsComponent implements OnInit {

  reservations: any[] = [];
  trajetId?: number;

  constructor(
    private service: ReservationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.trajetId = Number(this.route.snapshot.queryParamMap.get('trajetId'));
    if (this.trajetId) {
      this.service.reserver(this.trajetId).subscribe(() => this.load());
    }
    this.load();
  }

  load() {
    this.service.mesReservations().subscribe(data => this.reservations = data as any[]);
  }

  payer(id: number) {
    this.router.navigate(['/client/ticket', id]);
  }
}
