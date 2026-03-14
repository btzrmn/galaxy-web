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
    const allNews: any[] = (this.activatedRoute.snapshot.data['item'].news || [])
      .slice()
      .sort((a: any, b: any) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());

    if (!allNews.length) return;

    this.parentNews = allNews[0];
    this.news = allNews.slice(1, 4);
  }
}
