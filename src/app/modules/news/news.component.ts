import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: [],
})
export class NewsComponent {
  news: any[] = [];
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.news = this.activatedRoute.snapshot.data['item'].news;
  }
}
