import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { authenticationGuard } from '../shared/guards/authentication.guard';
import { AuthorizedUserComponent } from './authorized-user/authorized-user.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: AuthenticationComponent },
  { path: 'registration', component: AuthenticationComponent },
  {
    path: 'authorized-user',
    component: AuthorizedUserComponent,
    canActivate: [authenticationGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./authorized-user/content/content.routes').then((route) => route.contentRoutes),
      },
    ],
  },
];
