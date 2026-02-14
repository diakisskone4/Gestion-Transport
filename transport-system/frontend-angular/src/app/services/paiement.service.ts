import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paiement } from '../models/paiement.model';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  private apiUrl = 'http://127.0.0.1:8000/api/paiements';

  constructor(private http: HttpClient) {}

  payer(reservation: number, montant: number): Observable<Paiement> {
    return this.http.post<Paiement>(`${this.apiUrl}/`, {
      reservation,
      montant,
      statut: 'PAYE'
    });
  }

  getByReservation(reservationId: number): Observable<Paiement> {
    return this.http.get<Paiement>(`${this.apiUrl}/reservation/${reservationId}/`);
  }

  getAll(): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(`${this.apiUrl}/`);
  }
}
