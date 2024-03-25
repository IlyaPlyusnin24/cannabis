import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(loginData: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(loginData);

    return this.http.post('/api/Login', body, { headers });
  }
}
