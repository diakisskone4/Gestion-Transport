import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingsService } from '../../core/services/bookings.service';

@Component({
  standalone: true,
  selector: 'app-bookings',
  imports: [CommonModule],
  template: `
    <h2>Bookings</h2>

    <ul>
      <li *ngFor="let b of bookings">
        {{ b.customer }} - {{ b.date | date }}
      </li>
    </ul>
  `
})
export class BookingsComponent implements OnInit {

  bookings: any[] = [];

  constructor(private service: BookingsService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(data => {
      this.bookings = data;
    });
  }
}
