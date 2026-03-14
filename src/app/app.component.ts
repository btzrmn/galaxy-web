import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

import { LoadingService } from './modules/shared/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent {
  loading = false;

  constructor(private router: Router, private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      $(window).scrollTop(0);
    });
    this.setLoadingInterceptor();
  }

  setLoadingInterceptor() {
    this.loadingService.loadingSubject$.subscribe((val: boolean) => {
      this.loading = val;
    });
  }
}
