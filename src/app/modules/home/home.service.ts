import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { API_CONTENT, API_COUNT, API_EMPLOYEES, API_NEWS } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private employees: any = [];
  httpClient: HttpClient;

  constructor(injector: Injector) {
    this.httpClient = injector.get(HttpClient);
  }

  getCount(): Observable<any> {
    return this.httpClient.get<any>(API_COUNT);
  }

  getHomeNews(): Observable<any> {
    return this.httpClient.get<any>(API_NEWS);
  }

  getHomeContents(): Observable<any> {
    let params = new HttpParams();
    params = params.append('published.equals', false);
    return this.httpClient.get<any>(API_CONTENT, { params });
  }

  getEmployees$(): Observable<any[]> {
    return this.httpClient.get<any[]>(API_EMPLOYEES).pipe(
      tap((val: any[]) => {
        this.employees = val;
      }),
    );
  }

  getEmployees(): any[] {
    return this.employees;
  }
}
