import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './product.component';
import { ProductResolver } from './product.resolver';
import { ProductDetailResolver } from './product-detail/product-detail.resolver';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  {
    path: ':id',
    resolve: { item: ProductResolver },
    component: ProductComponent,
  },
  {
    path: ':id/:productId',
    resolve: { item: ProductDetailResolver },
    component: ProductDetailComponent,
  },
];

@NgModule({
  declarations: [ProductComponent, ProductDetailComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes), SharedModule],
})
export class ProductModule {}
