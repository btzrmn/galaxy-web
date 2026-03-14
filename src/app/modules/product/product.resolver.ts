import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';
import { ProductService } from './product.service';
import { forkJoin } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductResolver implements Resolve<any> {
  service: ProductService;

  constructor(injector: Injector) {
    this.service = injector.get(ProductService);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return forkJoin({
      contents: this.service.getContents(route.params['id']),
    });
  }
}
