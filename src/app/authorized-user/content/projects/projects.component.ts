import { Component, OnInit, inject } from '@angular/core';
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
export class ProjectsComponent implements OnInit {
  projects$!: Observable<Project[]>;

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

  public ngOnInit() {
    this.projects$ = this._projectService.getProjects();
  }
}
