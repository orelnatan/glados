import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  { 
    path: '',
    redirectTo: 'login-with-google',
    pathMatch: 'full'
  },
  { 
    path: 'login-with-google',
    loadComponent: () => import('./pages').then(loginWithGoogle => loginWithGoogle.LoginWithGooglePageModule),
  },
];
