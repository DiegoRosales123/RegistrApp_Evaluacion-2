import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { NavController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  rut: string = '';
  selectedCity: { id: number; name: string } = { id: 0, name: '' };
  selectedCommune: string = '';
  cities: { id: number; name: string }[] = [];
  communes: { id: number; name: string }[] = [];
  showErrorMessage: boolean = false;
  errorMessage: string = '';
  fotoTomada: boolean = false;

  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef;
  @ViewChild('canvasElement', { static: false }) canvasElement!: ElementRef;

  private video!: HTMLVideoElement;
  private canvas!: HTMLCanvasElement;
  public stream?: MediaStream;
  videoStreamURL: SafeResourceUrl | null = null;
  public fotoURL: SafeResourceUrl | null = null;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private http: HttpClient,
    private dataService: DataService,
    private sanitizer: DomSanitizer,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const fotoURLFromLocalStorage = localStorage.getItem('foto');
    if (fotoURLFromLocalStorage) {
      this.fotoURL = this.sanitizer.bypassSecurityTrustResourceUrl(fotoURLFromLocalStorage);
    }

    this.http.get<any>('https://dev.matiivilla.cl/duoc/location/region').subscribe({
      next: (data) => {
        this.cities = data.data.map((city: any) => ({
          id: city.id,
          name: city.nombre,
        }));
      },
      error: (error) => {
        console.error('Error al obtener la lista de ciudades:', error);
      },
    });
  }

  async tomarSelfie() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.fotoTomada = true;

      this.video = this.videoElement.nativeElement;
      this.canvas = this.canvasElement.nativeElement;

      this.video.srcObject = this.stream;
      await this.video.play();

      this.canvas.width = this.video.videoWidth;
      this.canvas.height = this.video.videoHeight;

      const context = this.canvas.getContext('2d');
      if (context) {
        context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);

        // Convierte el contenido del canvas a una imagen en formato Base64
        const base64Image = this.canvas.toDataURL('image/png');

        // Muestra la imagen en la página
        this.fotoURL = this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);

        // Almacena la imagen en el localStorage
        localStorage.setItem('foto', base64Image);
        console.log('Imagen guardada en localStorage:', base64Image);
      } else {
        console.error('No se pudo obtener el contexto 2D del canvas.');
      }

      this.changeDetector.detectChanges(); // Agregado
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }

  async detenerCamara() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }
  }

  navigateLeft() {
    this.navCtrl.back();
  }

  loadCommunes(city: { id: number; name: string }) {
    const cityId = city.id;
    this.http.get<any>(`https://dev.matiivilla.cl/duoc/location/comuna/${cityId}`).subscribe({
      next: (data) => {
        this.communes = data.data.map((commune: any) => ({
          id: commune.id,
          name: commune.nombre,
        }));
      },
      error: (error) => {
        console.error('Error al obtener la lista de comunas:', error);
      },
    });
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  validateRut(rut: string): boolean {
    const cleanRut = rut.replace(/[^\dkK]/gi, ''); 
    if (cleanRut.length < 3) return false;
  
    const rutDigits = cleanRut.slice(0, -1); // RUT
    const verifierDigit = cleanRut.slice(-1).toUpperCase(); // Digito verificador
  
    let sum = 0;
    let multiplier = 2;
  
    for (let i = rutDigits.length - 1; i >= 0; i--) {
      sum += +rutDigits.charAt(i) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }
  
    const calculatedVerifier = 11 - (sum % 11);
    const verifier = calculatedVerifier === 11 ? '0' : calculatedVerifier === 10 ? 'K' : calculatedVerifier.toString();
  
    return verifier === verifierDigit;
  }

  register() {
    if (
      this.email.trim() === '' ||
      this.username.trim() === '' ||
      this.password.trim() === '' ||
      this.rut.trim() === ''
    ) {
      this.showErrorMessage = true;
      this.errorMessage = 'Error, debe rellenar todos los campos';
    } else {
      this.showErrorMessage = false;
      this.errorMessage = '';

      const isEmailValid = this.validateEmail(this.email);
      const isRutValid = this.validateRut(this.rut);

      if (!isEmailValid || !isRutValid) {
        this.showErrorMessage = true;
        if (!isEmailValid && !isRutValid) {
          this.errorMessage = 'Correo electrónico y RUT no válidos';
        } else if (!isEmailValid) {
          this.errorMessage = 'Correo electrónico no válido';
        } else {
          this.errorMessage = 'RUT no válido';
        }
      } else {
        if (this.password === this.confirmPassword) {
          const user = {
            email: this.email,
            username: this.username,
            password: this.password,
            rut: this.rut,
            city: this.selectedCity,
            commune: this.selectedCommune,
          };

          this.dataService.addUser(user).then(() => {
            console.log('Usuario almacenado en IndexedDB:', user);
            this.router.navigate(['/login']);
          });
        } else {
          this.errorMessage = 'Las contraseñas no coinciden';
        }
      }
    }
  }
}
