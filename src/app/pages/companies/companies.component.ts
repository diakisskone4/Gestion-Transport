import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesService } from '../../core/services/companies.service';

@Component({
  standalone: true,
  selector: 'app-companies',
  imports: [CommonModule],
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  companies: any[] = [];
  loading = false;

  constructor(private service: CompaniesService) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.loading = true;
    this.service.getAll().subscribe({
      next: data => {
        this.companies = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  delete(id: number): void {
    if (confirm('Supprimer cette compagnie ?')) {
      this.service.delete(id).subscribe(() => {
        this.companies = this.companies.filter(c => c.id !== id);
      });
    }
  }
}
