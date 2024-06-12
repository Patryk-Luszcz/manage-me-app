import { Routes } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { AdminComponent } from './admin/admin.component';
import { adminGuard } from '../../../shared/guards/admin.guard';

export const contentRoutes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'admin', component: AdminComponent, canActivate: [adminGuard] },
];
