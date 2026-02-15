import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/* =========================
   MODELES
========================= */

export interface Trip {
  id: number;
  departure: string;
  destination: string;
  departure_time: string;
  price: number;
}

export interface Reservation {
  id?: number;
  seat_number: number;
  created_at?: string;
  trip: Trip;   // trajet complet
}

/* =========================
   SERVICE
========================= */

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl = 'http://127.0.0.1:8000/api/reservations';

  constructor(private http: HttpClient) {}

  // 🔐 HEADERS JWT
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // =========================
  // ADMIN : toutes les réservations
  // =========================
  getAll(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/`, {
      headers: this.getHeaders()
    });
  }

  // =========================
  // CLIENT : mes réservations
  // =========================
  getMesReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/mes/`, {
      headers: this.getHeaders()
    });
  }

  // =========================
  // CLIENT : réserver un trajet
  // =========================
  reserver(tripId: number): Observable<Reservation> {
    return this.http.post<Reservation>(
      `${this.baseUrl}/create/`,   // ✅ ENDPOINT CORRECT
      {
        trip_id: tripId,           // ✅ NOM ATTENDU PAR LE SERIALIZER
        seat_number: 1
      },
      { headers: this.getHeaders() }
    );
  }
}
