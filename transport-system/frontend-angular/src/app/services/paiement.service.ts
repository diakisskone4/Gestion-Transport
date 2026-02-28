import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Paiement } from '../models/paiement.model';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  private apiUrl = 'http://127.0.0.1:8000/api/paiements/';

  constructor(private http: HttpClient) {}

  // 🔐 HEADERS JWT (sécurisé)
  private getHeaders(): HttpHeaders {
  const token = localStorage.getItem('access_token');

  return new HttpHeaders({
    Authorization: token ? `Bearer ${token}` : ''
  });
}

  // ======================
  // CLIENT : payer une réservation
  // ======================
 payer(reservationId: number): Observable<Paiement> {
  return this.http.post<Paiement>(
    this.apiUrl,
    { reservation_id: reservationId },
    { headers: this.getHeaders() }
  );
}

  // ======================
  // CLIENT : paiement par réservation
  // ======================
  getByReservation(reservationId: number): Observable<Paiement> {
    return this.http.get<Paiement>(
      `${this.apiUrl}reservation/${reservationId}/`,
      { headers: this.getHeaders() }
    );
  }

  // ======================
  // ADMIN : tous les paiements
  // ======================
  // ======================
// ADMIN : tous les paiements
// ======================
getAllAdmin(): Observable<Paiement[]> {
  return this.http.get<Paiement[]>(
    this.apiUrl + 'admin/',
    { headers: this.getHeaders() }
  );
}

  
}