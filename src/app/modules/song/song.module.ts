import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { SongComponent } from './song.component';

const routes: Routes = [
  {
    path: '',
    component: SongComponent,
  },
];

@NgModule({
  declarations: [SongComponent],
  imports: [CommonModule, HttpClientModule, RouterModule.forChild(routes), SharedModule],
})
export class SongModule {}
