import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  private API_URL = 'http://127.0.0.1:8000/api';

  constructor(protected http: HttpClient) {}

  // =====================
  // LISTE
  // =====================
  getAll() {
    return this.http.get<any[]>(`${this.API_URL}/bookings/`);
  }

  // =====================
  // DÉTAIL
  // =====================
  getById(id: number) {
    return this.http.get<any>(`${this.API_URL}/bookings/${id}/`);
  }

  // =====================
  // CREATE
  // =====================
  create(data: any) {
    return this.http.post(`${this.API_URL}/bookings/`, data);
  }

  // =====================
  // UPDATE
  // =====================
  update(id: number, data: any) {
    return this.http.put(`${this.API_URL}/bookings/${id}/`, data);
  }

  // =====================
  // DELETE (optionnel)
  // =====================
  delete(id: number) {
    return this.http.delete(`${this.API_URL}/bookings/${id}/`);
  }
}
