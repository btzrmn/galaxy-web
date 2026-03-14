import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss'],
})
export class HomeContentComponent {
  content1: any = {};
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    const array = this.activatedRoute.snapshot.data['item'].contents;
    this.content1 = array.find((item: any) => item.typeCode === 'HOME001') || {};
  }
}
