import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs';
import { ProductService } from '../product.service';

@Injectable({ providedIn: 'root' })
export class ProductDetailResolver implements Resolve<any> {
  service: ProductService;

  constructor(injector: Injector) {
    this.service = injector.get(ProductService);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return forkJoin({
      content: this.service.getContent(route.params['productId']),
    });
  }
}
