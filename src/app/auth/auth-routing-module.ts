import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./components/auth-shell/auth-shell').then(m => m.AuthShell),
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () => 
          import('./components/login/login').then(m => m.Login)
      },
      {
        path: 'signup',
        loadComponent: () => 
          import('./components/signup/signup').then(m => m.Signup)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
