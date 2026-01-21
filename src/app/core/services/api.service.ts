import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  protected API_URL = 'http://127.0.0.1:8000/api';

  constructor(protected http: HttpClient) {}
}
