import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { Base } from '@layout/base/base';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/auth').then(m => m.Auth),
    children: authRoutes,
  },
  {
    path: '',
    component: Base,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard')
            .then(m => m.Dashboard),
      },

      {
        path: 'components',
        loadComponent: () =>
          import('./features/components/components')
            .then(m => m.Components),
      },
    ]
  }
];
