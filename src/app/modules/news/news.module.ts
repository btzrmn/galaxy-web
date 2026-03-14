import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { NewsComponent } from './news.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsDetailResolver } from './news-detail/news-detail.resolver';
import { NewsResolver } from './news.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: { item: NewsResolver },
    component: NewsComponent,
  },
  {
    path: ':id',
    resolve: { item: NewsDetailResolver },
    component: NewsDetailComponent,
  },
];

@NgModule({
  declarations: [NewsComponent, NewsDetailComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes), SharedModule],
})
export class NewsModule {}
