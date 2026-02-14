import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface AuthResponse {
  access: string;
  user: {
    id: number;
    username: string;
    email?: string;
    is_staff: boolean;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000';
  user = signal<AuthResponse | null>(null);

  constructor(private http: HttpClient) {
    const saved = localStorage.getItem('auth');
    if (saved) this.user.set(JSON.parse(saved));
  }

  login(data: { username: string; password: string }) {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/api/auth/login/`, data)
      .pipe(
        tap(auth => {
          localStorage.setItem('auth', JSON.stringify(auth));
          this.user.set(auth);
        })
      );
  }

  register(data: { username: string; email?: string; password: string }) {
    return this.http.post(`${this.apiUrl}/api/auth/register/`, data);
  }

  logout() {
    localStorage.removeItem('auth');
    this.user.set(null);
  }

  isAdmin(): boolean {
    return this.user()?.user.is_staff === true;
  }

  token(): string | null {
    return this.user()?.access || null;
  }

  // Vérifie le token auprès du backend
  me(): Observable<any> {
  const token = this.token();
  if (!token) {
    throw new Error('Token manquant, utilisateur non connecté');
  }
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this.http.get(`${this.apiUrl}/api/auth/me/`, { headers });
}

}
