import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApidispositivoPage } from './apidispositivo.page';

const routes: Routes = [
  {
    path: '',
    component: ApidispositivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApidispositivoPageRoutingModule {}
