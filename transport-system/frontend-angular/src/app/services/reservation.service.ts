import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Définis un modèle pour tes réservations
export interface Reservation {
  id: number;
  numeroPlace: number;
  // ajoute les autres champs nécessaires
}

@Injectable({ providedIn: 'root' })
export class ReservationService {

  private apiUrl = 'http://127.0.0.1:8000/api/reservations/';

  constructor(private http: HttpClient) {}

  // Récupérer toutes les réservations
  getAll(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl);
  }

  // Réserver un trajet
  reserver(trajetId: number): Observable<any> {
    return this.http.post(this.apiUrl, { trajetId });
  }

  // Mes réservations personnelles
  mesReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/me`);
  }

  // Modifier une réservation
  modifierUneFois(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}
