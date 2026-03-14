import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: [],
})
export class AboutUsComponent {
  data: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.data = this.activatedRoute.snapshot.data['item'][0]['info'];
  }
}
