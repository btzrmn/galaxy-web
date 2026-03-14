import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { SongComponent } from './song.component';
import { SongDetailComponent } from './song-detail/song-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SongComponent,
  },
  {
    path: ':id',
    component: SongDetailComponent,
  },
];

@NgModule({
  declarations: [SongComponent, SongDetailComponent],
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule.forChild(routes), SharedModule],
})
export class SongModule {}
