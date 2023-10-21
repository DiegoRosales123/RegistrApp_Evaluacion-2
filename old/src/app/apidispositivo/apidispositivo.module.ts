import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApidispositivoPageRoutingModule } from './apidispositivo-routing.module';

import { ApidispositivoPage } from './apidispositivo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApidispositivoPageRoutingModule
  ],
  declarations: [ApidispositivoPage]
})
export class ApidispositivoPageModule {}
