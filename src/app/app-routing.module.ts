import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '@shared/guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadComponent: () =>
      import('@pages/auth/components/login/login.component').then(
        m => m.LoginComponent
      ),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('@pages/auth/components/sign-up/sign-up.component').then(
        m => m.SignUpComponent
      ),
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('@pages/users/users.component').then(m => m.UsersComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
