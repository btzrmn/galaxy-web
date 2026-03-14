import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  protected _count = 0;

  constructor(private _loadingService: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.urlWithParams.includes('loading=false')) {
      return next.handle(req);
    }

    this._loadingService.clearTimer();
    this._loadingService.show();
    this._count++;

    return next.handle(req).pipe(
      finalize(() => {
        this._count--;
        if (this._count === 0) {
          this._loadingService.startTimer();
        }
      })
    );
  }
}
