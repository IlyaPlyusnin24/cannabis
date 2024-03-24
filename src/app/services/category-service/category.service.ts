import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  createCategories(categories: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(categories);

    return this.http.post('/api/Categories', body, { headers });
  }

  retrieveCategories(name: string) {
    return this.http.get(`/api/Categories/${name}`);
  }
}
