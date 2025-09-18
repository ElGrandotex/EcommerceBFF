import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./core/page/dashboard/dashboard').then(m => m.Dashboard),
    children: [
      {
        path: 'table',
        loadComponent: () => import('./core/components/table/table').then(m => m.Table)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
