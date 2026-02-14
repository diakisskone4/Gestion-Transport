import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trajet } from '../models/trajet.model';

@Injectable({ providedIn: 'root' })
export class TrajetService {

  private apiUrl = 'http://127.0.0.1:8000/api/trajets/';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Trajet[]>(this.apiUrl);
  }

  create(t: Trajet) {
    return this.http.post(this.apiUrl, t);
  }

  update(id: number, t: Trajet) {
    return this.http.put(`${this.apiUrl}/${id}`, t);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
