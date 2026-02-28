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
  trip: Trip;
}

/* =========================
   SERVICE
========================= */

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl = 'http://127.0.0.1:8000/api/reservations/';

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
    return this.http.get<Reservation[]>(
      this.baseUrl,
      { headers: this.getHeaders() }
    );
  }

  // =========================
  // CLIENT : mes réservations
  // =========================
  getMesReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(
      `${this.baseUrl}mes/`,
      { headers: this.getHeaders() }
    );
  }

  // =========================
  // CLIENT : réserver un trajet
  // =========================
  reserver(tripId: number, seatNumber: number = 1): Observable<Reservation> {
    return this.http.post<Reservation>(
      `${this.baseUrl}create/`,
      {
        trip_id: tripId,
        seat_number: seatNumber
      },
      { headers: this.getHeaders() }
    );
  }

  // =========================
  // CLIENT : une réservation par ID (OBLIGATOIRE)
  // =========================
  getById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(
      `${this.baseUrl}${id}/`,
      { headers: this.getHeaders() }
    );
  }
}