import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-news',
  templateUrl: './home-news.component.html',
  styleUrls: ['./home-news.component.scss'],
})
export class HomeNewsComponent {
  parentNews: any;
  news: any[] = [];
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    const allNews = this.activatedRoute.snapshot.data['item'].news;
    this.parentNews = allNews[0];
    if (allNews[1]) {
      this.news.push(allNews[1]);
    } else {
      this.news.push(allNews[0]);
    }
    if (allNews[2]) {
      this.news.push(allNews[2]);
    } else {
      this.news.push(allNews[0]);
    }
    if (allNews[3]) {
      this.news.push(allNews[3]);
    } else {
      this.news.push(allNews[0]);
    }
  }
}
