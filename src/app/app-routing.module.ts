import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '@shared/guards/auth.guard';
import { AppRouteEnum } from '@core/enums';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: AppRouteEnum.Login },
  {
    path: AppRouteEnum.Login,
    loadComponent: () =>
      import('@pages/auth/components/login/login.component').then(
        m => m.LoginComponent
      ),
  },
  {
    path: AppRouteEnum.SignUp,
    loadComponent: () =>
      import('@pages/auth/components/sign-up/sign-up.component').then(
        m => m.SignUpComponent
      ),
  },
  {
    path: AppRouteEnum.Users,
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('@pages/users/users.component').then(m => m.UsersComponent),
  },
  {
    path: AppRouteEnum.Clinics,
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('@pages/clinics/clinics.component').then(m => m.ClinicsComponent),
  },
  {
    path: '**',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('@pages/not-found/not-found.component').then(
        m => m.NotFoundComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
