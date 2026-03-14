import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: [],
})
export class ProductDetailComponent {
  content: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.content = this.activatedRoute.snapshot.data['item'].content;
  }
}
