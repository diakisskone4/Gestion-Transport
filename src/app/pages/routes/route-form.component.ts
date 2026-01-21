import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { RoutesService } from '../../core/services/routes.service';

@Component({
  standalone: true,
  selector: 'app-route-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './routes-form.component.html',
  styleUrls: ['./routes-form.component.scss']
})
export class RouteFormComponent implements OnInit {

  id?: number;
  form!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: RoutesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required]
    });

    const paramId = this.route.snapshot.paramMap.get('id');
    this.id = paramId ? Number(paramId) : undefined;

    if (this.id) {
      this.loading = true;
      this.service.getById(this.id).subscribe({
        next: (data: any) => {
          this.form.patchValue(data);
          this.loading = false;
        },
        error: () => this.loading = false
      });
    }
  }

  submit(): void {
    if (this.form.invalid) return;

    const request$ = this.id
      ? this.service.update(this.id, this.form.value)
      : this.service.create(this.form.value);

    request$.subscribe(() => {
      this.router.navigate(['/routes']);
    });
  }
}
