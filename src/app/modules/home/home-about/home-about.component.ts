import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-about',
  templateUrl: './home-about.component.html',
  styleUrls: [],
})
export class HomeAboutComponent {
  countValue: any;
  content2: any = {};
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.countValue = this.activatedRoute.snapshot.data['item'].count;
    const array = this.activatedRoute.snapshot.data['item'].contents;
    this.content2 = array.find((item: any) => item.typeCode === 'HOME002') || {};
  }
}
