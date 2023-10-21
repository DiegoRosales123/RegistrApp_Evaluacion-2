import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  incorrectPassword: boolean = false;
  fieldsEmpty: boolean = false;
  verificationMessage: string = '';
  isLeftButtonDisabled = true; // Inicialmente, deshabilita el botón izquierdo

  constructor(private router: Router, private dataService: DataService) {}

  login() {
    if (!this.email || !this.password) {
      this.fieldsEmpty = true;
      this.incorrectPassword = false;
      return;
    } else {
      this.fieldsEmpty = false;
    }

    this.dataService.authenticate(this.email, this.password).then((authenticated) => {
      if (authenticated) {
        this.verificationMessage = 'Verificación exitosa, redireccionando...';

        // Establece un indicador de autenticación
        this.dataService.setAuthenticated(true);

        // Habilita el botón izquierdo
        this.isLeftButtonDisabled = false;

        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 5000);
      } else {
        this.incorrectPassword = true;
        this.verificationMessage = '';
      }
    });
  }

  navigateLeft() {
    // No haces nada o muestras un mensaje de error si el botón está deshabilitado
  }

  navigateRight() {
    if (!this.isLeftButtonDisabled) {
      this.router.navigate(['/home']);
    }
  }
}
