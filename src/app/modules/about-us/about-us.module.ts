import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AboutUsComponent } from './about-us.component';
import { AboutUsResolver } from './about-us.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: { item: AboutUsResolver },
    component: AboutUsComponent,
  },
];

@NgModule({
  declarations: [AboutUsComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes), SharedModule],
})
export class AboutUsModule {}
