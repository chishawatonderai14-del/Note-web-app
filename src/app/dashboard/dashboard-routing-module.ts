import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./layout-shell/layout-shell').then((m) => m.LayoutShell),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => 
          import('./pages/home/home').then((m) => m.Home)
      },
      {
        path: 'category',
        loadComponent: () => 
          import('./pages/category/category').then((m) => m.Category)
      },
      {
        path: 'activity',
        loadComponent: () => 
          import('./pages/activity/activity').then((m) => m.Activity)
      },
      {
        path: 'add-note/:id',
        loadComponent: () => 
          import('./pages/addNote/add-note-model').then((m) => m.AddNoteModel)
      }
    ]
  },
  {
    path: 'profile',
    loadComponent: () => 
      import('./pages/profile/profile').then((m) => m.Profile)
  },
  {
    path: 'edit-profile',
    loadComponent: () => 
      import('./pages/editprofile/editprofile').then(m => m.Editprofile)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
