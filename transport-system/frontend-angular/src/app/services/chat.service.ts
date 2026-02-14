import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Message {
  id?: number;
  expediteurId?: number;
  destinataireId?: number;
  contenu: string;
  date?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://127.0.0.1:8000/api/messages/';

  constructor(private http: HttpClient) {}

  envoyer(message: Message): Observable<Message> {
    return this.http.post<Message>(this.apiUrl, message);
  }

  getConversation(userId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/${userId}`);
  }
}
