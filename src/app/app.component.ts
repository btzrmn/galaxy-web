import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { LoadingService } from './modules/shared/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading = false;
  private observer: IntersectionObserver | null = null;

  constructor(private router: Router, private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        setTimeout(() => requestAnimationFrame(() => this.initScrollReveal()), 50);
      }
    });

    this.setLoadingInterceptor();
    setTimeout(() => requestAnimationFrame(() => this.initScrollReveal()), 100);
  }

  setLoadingInterceptor(): void {
    this.loadingService.loadingSubject$.subscribe((val: boolean) => {
      this.loading = val;
      if (!val) {
        setTimeout(() => requestAnimationFrame(() => this.initScrollReveal()), 50);
      }
    });
  }

  private initScrollReveal(): void {
    if (this.observer) {
      this.observer.disconnect();
    }

    const targets = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right'
    );

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px 0px 0px' }
    );

    targets.forEach((el) => this.observer!.observe(el));
  }
}
