import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs';
import { NewsService } from '../news.service';

@Injectable({ providedIn: 'root' })
export class NewsDetailResolver implements Resolve<any> {
  service: NewsService;

  constructor(injector: Injector) {
    this.service = injector.get(NewsService);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return forkJoin({
      news: this.service.getNews(route.params['id']),
    });
  }
}
