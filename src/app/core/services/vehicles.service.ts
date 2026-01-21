import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class VehiclesService extends ApiService {

  getAll() {
    return this.http.get<any[]>(`${this.API_URL}/vehicles/`);
  }

  getById(id: number) {
    return this.http.get(`${this.API_URL}/vehicles/${id}/`);
  }

  create(data: any) {
    return this.http.post(`${this.API_URL}/vehicles/`, data);
  }

  update(id: number, data: any) {
    return this.http.put(`${this.API_URL}/vehicles/${id}/`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/vehicles/${id}/`);
  }
}
