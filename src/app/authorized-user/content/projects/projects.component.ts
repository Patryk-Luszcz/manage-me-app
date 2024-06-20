import { Component, inject } from '@angular/core';
import { ProjectService } from '../../../../shared/services/project.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { Observable } from 'rxjs';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { Project } from '../../../../shared/interfaces/project.interface';
import { TableConfig } from '../../../../shared/components/table/table.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [AsyncPipe, NgFor, TableComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  tableConfig: TableConfig<Project>[] = [
    {
      title: 'Name',
      modelProp: 'name',
    },
    {
      title: 'Description',
      modelProp: 'description',
    },
  ];


  private _projectService = inject(ProjectService);

  projects$: Observable<Project[]> = this._projectService.getProjects();

  public handleClick(event$: any) {
    console.log(event$);
  }
}
