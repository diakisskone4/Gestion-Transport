import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsService } from '../../core/services/payments.service';

@Component({
  standalone: true,
  selector: 'app-payments',
  imports: [CommonModule],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  payments: any[] = [];

  constructor(private service: PaymentsService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(data => {
      this.payments = data;
    });
  }

  delete(id: number): void {
    if (confirm('Supprimer ce paiement ?')) {
      this.service.delete(id).subscribe(() => {
        this.payments = this.payments.filter(p => p.id !== id);
      });
    }
  }
}
