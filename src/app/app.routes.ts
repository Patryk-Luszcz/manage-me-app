import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { authenticationGuard } from '../shared/guards/authentication.guard';
import { ProjectsComponent } from './projects/projects.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: AuthenticationComponent },
  { path: 'registration', component: AuthenticationComponent },
  { path: 'projects', component: ProjectsComponent, canActivate: [authenticationGuard] },
];
