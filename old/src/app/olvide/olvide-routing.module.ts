import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OlvidePage } from './olvide.page';

const routes: Routes = [
  {
    path: '',
    component: OlvidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OlvidePageRoutingModule {}
