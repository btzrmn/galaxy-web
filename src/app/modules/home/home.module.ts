import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeNewsComponent } from './home-news/home-news.component';
import { HomeServicesComponent } from './home-services/home-services.component';
import { HomeAboutComponent } from './home-about/home-about.component';
import { HomeResolver } from './home.resolver';
import { HomeContentComponent } from './home-content/home-content.component';

const routes: Routes = [
  {
    path: '',
    resolve: { item: HomeResolver },
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [HomeComponent, HomeAboutComponent, HomeNewsComponent, HomeServicesComponent, HomeContentComponent],
  providers: [HomeAboutComponent, HomeNewsComponent, HomeServicesComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes), SharedModule],
})
export class HomeModule {}
