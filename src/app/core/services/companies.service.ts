import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class CompaniesService extends ApiService {

  getAll() {
    return this.http.get<any[]>(`${this.API_URL}/companies/`);
  }

  getById(id: number) {
    return this.http.get(`${this.API_URL}/companies/${id}/`);
  }

  create(data: any) {
    return this.http.post(`${this.API_URL}/companies/`, data);
  }

  update(id: number, data: any) {
    return this.http.put(`${this.API_URL}/companies/${id}/`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/companies/${id}/`);
  }
}
