import { Component } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importa NavController
import { DataService } from '../data.service';

@Component({
  selector: 'app-olvide',
  templateUrl: './olvide.page.html',
  styleUrls: ['./olvide.page.scss'],
})
export class OlvidePage {
  username: string = '';
  recoveredPassword: string | null = null;
  recoveredEmail: string | null = null;
  userNotFound: boolean = false;
  searchingCredentials: boolean = false;

  constructor(private navCtrl: NavController, private dataService: DataService) {} // Inyecta NavController

  recoverPassword() {
    this.searchingCredentials = true;

    setTimeout(() => {
      // Lógica para recuperar la contraseña aquí

      // Llama al servicio DataService para recuperar el usuario por nombre de usuario
      this.dataService.getUserByUsername(this.username).then((user) => {
        if (user) {
          // Usuario encontrado
          // Asigna la contraseña y el correo recuperados a las variables correspondientes
          this.recoveredPassword = user.password;
          this.recoveredEmail = user.email;
          // Reinicia la variable de usuario no encontrado
          this.userNotFound = false;
        } else {
          // El nombre de usuario no coincide con ningún registro
          // Establece la variable de usuario no encontrado en verdadero
          this.userNotFound = true;
          // Reinicia las variables de contraseña y correo
          this.recoveredPassword = null;
          this.recoveredEmail = null;
        }

        // Cambia el mensaje después de completar la búsqueda
        this.searchingCredentials = false;
      });
    }, 5000); // 5000 ms = 5 segundos (simulación)
  }

  navigateLeft() {
    // Navega de vuelta a la página anterior (por ejemplo, /home)
    this.navCtrl.back();
  }
}
