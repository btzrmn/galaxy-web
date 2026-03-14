import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { API_CONTENT } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  httpClient: HttpClient;

  constructor(injector: Injector) {
    this.httpClient = injector.get(HttpClient);
  }

  getContents(id: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('published.equals', true);
    params = params.append('typeCode.equals', 'WEBT00' + id);
    return this.httpClient.get<any>(API_CONTENT, { params });
  }

  getContent(id: number): Observable<any> {
    return this.httpClient.get<any>(API_CONTENT + '/' + id);
  }
}
