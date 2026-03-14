import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { API_CONTENT, API_COUNT } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class AboutUsService {
  httpClient: HttpClient;

  constructor(injector: Injector) {
    this.httpClient = injector.get(HttpClient);
  }

  getAboutUs(): Observable<any> {
    return this.httpClient.get<any>(API_CONTENT + '?published.equals=false&typeCode.equals=ABOUTUS');
  }
}
