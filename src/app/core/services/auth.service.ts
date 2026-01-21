import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://127.0.0.1:8000/api';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(data: { username: string; password: string }) {
    return this.http.post<any>(`${this.API_URL}/accounts/login/`, data);
  }

  register(data: { username: string; email: string; password: string }) {
    return this.http.post(`${this.API_URL}/accounts/register/`, data);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
