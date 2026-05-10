import { Routes } from '@angular/router';
import { authGuard } from './guard/auth-guard';
import { guestGuard } from './guard/guest-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => 
            import('./auth/auth-module').then(m => m.AuthModule),
        canActivate: [guestGuard]
    },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('./dashboard/dashboard-module').then((m) => m.DashboardModule),
        canActivate: [authGuard]
    }
];
