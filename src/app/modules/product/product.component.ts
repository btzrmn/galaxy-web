import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: [],
})
export class ProductComponent {
  contents: any[] = [];
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.contents = this.activatedRoute.snapshot.data['item'].contents;
  }
}
