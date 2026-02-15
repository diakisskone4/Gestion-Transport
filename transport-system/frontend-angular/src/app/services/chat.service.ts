import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Message {
  id?: number;
  expediteur?: any;
  destinataire?: any;
  contenu: string;
  date?: string;
}

export interface Client {
  id: number;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://127.0.0.1:8000/api/messages';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.auth.token();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  envoyer(message: { contenu: string; destinataireId: number }): Observable<Message> {
    return this.http.post<Message>(
      `${this.apiUrl}/`,
      message,
      { headers: this.getHeaders() }
    );
  }

  getConversation(userId: number): Observable<Message[]> {
    return this.http.get<Message[]>(
      `${this.apiUrl}/${userId}/`,
      { headers: this.getHeaders() }
    );
  }

  // ✅ NOUVEAU : récupérer les clients (admin uniquement)
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(
      `${this.apiUrl}/clients/`,
      { headers: this.getHeaders() }
    );
  }
}
