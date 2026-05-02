import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'shell',
    pathMatch: 'full'
  },
  {
    path: 'shell',
    loadComponent: () => 
      import('./layout-shell/layout-shell').then((m) => m.LayoutShell)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
