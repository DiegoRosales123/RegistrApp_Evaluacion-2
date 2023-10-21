import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScannerPage } from './scanner.page'; // Asegúrate de importar ScannerPage

import { ScannerPageRoutingModule } from './scanner-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScannerPageRoutingModule
  ],
  declarations: [ScannerPage],
  exports: [ScannerPage] // Asegúrate de exportar ScannerPage
})
export class ScannerPageModule {}
