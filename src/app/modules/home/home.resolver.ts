import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';
import { HomeService } from './home.service';
import { forkJoin } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HomeResolver implements Resolve<any> {
  service: HomeService;

  constructor(injector: Injector) {
    this.service = injector.get(HomeService);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return forkJoin({
      count: this.service.getCount(),
      news: this.service.getHomeNews(),
      contents: this.service.getHomeContents(),
      employees: this.service.getEmployees$(),
    });
  }
}
