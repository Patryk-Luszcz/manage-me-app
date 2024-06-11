import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthenticationComponent },

  { path: 'registration', component: AuthenticationComponent },
];
