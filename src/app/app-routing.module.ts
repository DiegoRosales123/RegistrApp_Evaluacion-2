import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Importa tu guard personalizado

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', // Ruta predeterminada
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard], // Aplica el guard a esta ruta
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
  },
  {
    path: 'olvide',
    loadChildren: () => import('./olvide/olvide.module').then( m => m.OlvidePageModule),
  },
  {
    path: 'scanner',
    loadChildren: () => import('./scanner/scanner.module').then( m => m.ScannerPageModule),
    canActivate: [AuthGuard], // Aplica el guard a esta ruta
  },
  {
    path: 'apidispositivo',
    loadChildren: () => import('./apidispositivo/apidispositivo.module').then( m => m.ApidispositivoPageModule),
    canActivate: [AuthGuard], // Aplica el guard a esta ruta
  },
  {
    path: 'api-dispositivo',
    loadChildren: () => import('./api-dispositivo/api-dispositivo.module').then( m => m.ApiDispositivoPageModule),
    canActivate: [AuthGuard], // Aplica el guard a esta ruta
  },
  {
    path: '**',
    loadChildren: () => import('./error404/error404.module').then( m => m.Error404PageModule),
    canActivate: [AuthGuard], // Aplica el guard a esta ruta
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
