import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { API_EMPLOYEES, API_FEEDBACK } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  httpClient: HttpClient;

  constructor(injector: Injector) {
    this.httpClient = injector.get(HttpClient);
  }

  create(body: any): Observable<any> {
    return this.httpClient.post<any>(API_FEEDBACK, body);
  }
}
