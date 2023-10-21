import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApiDispositivoPage } from './api-dispositivo.page';

const routes: Routes = [
  {
    path: '',
    component: ApiDispositivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApiDispositivoPageRoutingModule {}
