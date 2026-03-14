import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { API_NEWS } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  httpClient: HttpClient;

  constructor(injector: Injector) {
    this.httpClient = injector.get(HttpClient);
  }

  getAllNews(): Observable<any> {
    return this.httpClient.get<any>(API_NEWS);
  }

  getNews(id: number): Observable<any> {
    return this.httpClient.get<any>(API_NEWS + '/' + id);
  }
}
