import { Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-api-dispositivo',
  templateUrl: './api-dispositivo.page.html',
  styleUrls: ['./api-dispositivo.page.scss'],
})
export class ApiDispositivoPage implements OnInit {

  constructor(private toastController: ToastController) { }

  ngOnInit() {
  }

  async logDeviceInfo() {
    const info = await Device.getInfo();
    this.presentToast(`Información del Dispositivo: \n Modelo: ${info.model} \n Plataforma: ${info.platform} \n Sistema Operativo: ${info.operatingSystem}`);
  }

  async logBatteryInfo() {
    const info = await Device.getBatteryInfo();
    let message = 'Información de la Bateria:\n';
  
    if (info.batteryLevel !== undefined) {
      message += `Nivel de Bateria: ${(info.batteryLevel * 100).toFixed(2)}%\n`;
    } else {
      message += 'Nivel de Bateria: No disponible\n';
    }
  
    message += `Cargando: ${info.isCharging ? 'Sí' : 'No'}`;
  
    this.presentToast(message);
  }
  
  
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000, // Duración del Toast (5 segundos en este caso)
      position: 'top', 
    });

    toast.present();
  }
}
