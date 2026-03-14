import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { KaraokePlacesComponent } from './karaoke-places.component';

const routes: Routes = [
  {
    path: '',
    component: KaraokePlacesComponent,
  },
];

@NgModule({
  declarations: [KaraokePlacesComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class KaraokePlacesModule {}
