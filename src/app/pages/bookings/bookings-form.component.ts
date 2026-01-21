import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BookingsService } from '../../core/services/bookings.service';

@Component({
  standalone: true,
  selector: 'app-booking-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bookings-form.component.html',
  styleUrls: ['./bookings-form.component.scss']
})
export class BookingFormComponent implements OnInit {

  id?: number;
  form!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: BookingsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire (OBLIGATOIRE ici)
    this.form = this.fb.group({
      customer: ['', Validators.required],
      date: ['', Validators.required],
      route: ['', Validators.required]
    });

    // Lecture de l'id depuis l'URL
    const paramId = this.route.snapshot.paramMap.get('id');
    this.id = paramId ? Number(paramId) : undefined;

    // Mode édition
    if (this.id) {
      this.loading = true;
      this.service.getById(this.id).subscribe({
        next: (data: any) => {
          this.form.patchValue(data);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }

  submit(): void {
    if (this.form.invalid) return;

    const request$ = this.id
      ? this.service.update(this.id, this.form.value)
      : this.service.create(this.form.value);

    request$.subscribe(() => {
      this.router.navigate(['/bookings']);
    });
  }
}
