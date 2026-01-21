import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class RoutesService extends ApiService {

  getAll() {
    return this.http.get<any[]>(`${this.API_URL}/routes/`);
  }

  getById(id: number) {
    return this.http.get(`${this.API_URL}/routes/${id}/`);
  }

  create(data: any) {
    return this.http.post(`${this.API_URL}/routes/`, data);
  }

  update(id: number, data: any) {
    return this.http.put(`${this.API_URL}/routes/${id}/`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/routes/${id}/`);
  }
}
