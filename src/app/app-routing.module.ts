import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    title: 'Next Galaxy',
    children: [
      {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'news',
        loadChildren: () => import('./modules/news/news.module').then((m) => m.NewsModule),
      },
      {
        path: 'product',
        loadChildren: () => import('./modules/product/product.module').then((m) => m.ProductModule),
      },
      {
        path: 'about-us',
        loadChildren: () => import('./modules/about-us/about-us.module').then((m) => m.AboutUsModule),
      },
      {
        path: 'song',
        loadChildren: () => import('./modules/song/song.module').then((m) => m.SongModule),
      },
      {
        path: 'karaoke-places',
        loadChildren: () =>
          import('./modules/karaoke-places/karaoke-places.module').then(
            (m) => m.KaraokePlacesModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
