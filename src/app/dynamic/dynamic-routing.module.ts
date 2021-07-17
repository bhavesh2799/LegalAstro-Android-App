import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DynamicPage } from './dynamic.page';

const routes: Routes = [
  {
    path: '',
    component: DynamicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DynamicPageRoutingModule {}
