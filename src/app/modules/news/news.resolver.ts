import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';
import { NewsService } from './news.service';
import { forkJoin } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NewsResolver implements Resolve<any> {
  service: NewsService;

  constructor(injector: Injector) {
    this.service = injector.get(NewsService);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return forkJoin({
      news: this.service.getAllNews(),
    });
  }
}
