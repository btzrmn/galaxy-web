import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  protected _loadingSubject$ = new Subject<boolean>();
  private timer: any = null;

  get loadingSubject$(): Subject<boolean> {
    return this._loadingSubject$;
  }

  show(): void {
    this._loadingSubject$.next(true);
  }

  hide(): void {
    this._loadingSubject$.next(false);
  }

  startTimer() {
    this.timer = setTimeout(() => this.hide(), 100);
  }

  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
