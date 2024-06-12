import { Routes } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';

export const contentRoutes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent },
];
