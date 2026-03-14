import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    title: 'Next galaxy',
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
          },
        ],
      },
      {
        path: 'news',
        children: [
          {
            path: '',
            loadChildren: () => import('./modules/news/news.module').then((m) => m.NewsModule),
          },
        ],
      },
      {
        path: 'product',
        children: [
          {
            path: '',
            loadChildren: () => import('./modules/product/product.module').then((m) => m.ProductModule),
          },
        ],
      },
      {
        path: 'about-us',
        children: [
          {
            path: '',
            loadChildren: () => import('./modules/about-us/about-us.module').then((m) => m.AboutUsModule),
          },
        ],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
