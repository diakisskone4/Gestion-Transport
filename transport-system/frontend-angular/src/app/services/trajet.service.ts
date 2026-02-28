import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trajet } from '../models/trajet.model';

@Injectable({ providedIn: 'root' })
export class TrajetService {

  private apiUrl = 'http://127.0.0.1:8000/api/trajets/';

  constructor(private http: HttpClient) {}

  // 🔐 HEADERS JWT
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ======================
  // CLIENT / PUBLIC : tous les trajets
  // ======================
  getAll(): Observable<Trajet[]> {
    return this.http.get<Trajet[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  // ======================
  // ADMIN : créer un trajet
  // ======================
  create(trajet: Trajet): Observable<Trajet> {
    return this.http.post<Trajet>(
      this.apiUrl,
      trajet,
      { headers: this.getHeaders() }
    );
  }

  // ======================
  // ADMIN : modifier un trajet
  // ======================
  update(id: number, trajet: Trajet): Observable<Trajet> {
    return this.http.put<Trajet>(
      `${this.apiUrl}${id}/`,   // ✅ slash final
      trajet,
      { headers: this.getHeaders() }
    );
  }

  // ======================
  // ADMIN : supprimer un trajet
  // ======================
  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}${id}/`,   // ✅ slash final
      { headers: this.getHeaders() }
    );
  }
}