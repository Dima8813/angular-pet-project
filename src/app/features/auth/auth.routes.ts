import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./components/sign-in/sign-in').then((m) => m.SignIn),
  },
]
