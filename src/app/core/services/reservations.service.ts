import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class ReservationsService extends ApiService {

  getAll() {
    return this.http.get<any[]>(`${this.API_URL}/bookings/`);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/bookings/${id}/`);
  }
}
