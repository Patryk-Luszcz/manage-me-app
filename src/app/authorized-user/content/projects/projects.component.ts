import { Component, inject } from '@angular/core';
import { ProjectService } from '../../../../shared/services/project.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { Project } from '../../../../shared/interfaces/project.interface';
import { TableConfig } from '../../../../shared/components/table/table.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActionsStrategyService } from '../../../../shared/services/actions-strategy/actions-strategy.service';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [AsyncPipe, NgFor, TableComponent, MatDialogModule, MatTooltip],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  projectsTableConfig: TableConfig<Project>[] = [
    {
      title: 'Name',
      modelProp: 'name',
    },
    {
      title: 'Description',
      modelProp: 'description',
    },
    {
      title: 'Active',
      modelProp: 'active',
      computeValue: ({ active }) => (active ? 'Yes' : 'No'),
    },
  ];

  private _modal = inject(MatDialog);
  private _projectService = inject(ProjectService);
  private _actionsStrategyService = inject(ActionsStrategyService);

  projects$ = this._projectService.getProjects();
  activeProject$ = this._projectService.getActiveProject();

  public handleOperationType({ actionType, item }: { actionType: string; item: Project }) {
    const action = `${actionType}_PROJECT`;
    const component = this._actionsStrategyService.actionStrategyHandler(action);

    const modalRef = this._modal.open(component, {
      data: {
        title: action,
        project: item,
        alertInfo: 'Are you sure you want to delete this project ?',
      },
      minWidth: '40vw',
    });

    modalRef.afterClosed().subscribe((payload) => {
      if (!payload) return;

      if (action === 'DELETE_PROJECT') {
        this._projectService.deleteProject(item.id).subscribe({
          next: () => {
            this.projects$ = this._projectService.getProjects();
          },
          error: (error) => alert(error.message),
        });
      } else if (action === 'ADD_PROJECT') {
        this._projectService.createProject(payload).subscribe({
          next: () => {
            this.projects$ = this._projectService.getProjects();
          },
          error: (error) => alert(error.message),
        });
      } else {
        this._projectService.updateProject(payload).subscribe({
          next: () => {
            this.projects$ = this._projectService.getProjects();
          },
          error: (error) => alert(error.message),
        });
      }
    });
  }
}
