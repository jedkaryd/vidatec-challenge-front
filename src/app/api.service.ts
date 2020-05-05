import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers: HttpHeaders;

  private SERVER_URL = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  get(endpoint: string): Observable<any> {
    return this.httpClient.get(`${this.SERVER_URL}/${endpoint}`, { headers: this.headers });
  }
}
