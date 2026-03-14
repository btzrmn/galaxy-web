import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';
import { AboutUsService } from './about-us.service';

@Injectable({ providedIn: 'root' })
export class AboutUsResolver implements Resolve<any> {
  service: AboutUsService;

  constructor(injector: Injector) {
    this.service = injector.get(AboutUsService);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.service.getAboutUs();
  }
}
