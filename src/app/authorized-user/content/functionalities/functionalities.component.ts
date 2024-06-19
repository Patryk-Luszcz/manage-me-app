import { Component, inject } from '@angular/core';
import { TableComponent, TableConfig } from '../../../../shared/components/table/table.component';
import { FunctionalityService } from '../../../../shared/services/functionality.service';
import { Functionality } from '../../../../shared/interfaces/functionality.inteface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-functionalities',
  standalone: true,
  imports: [TableComponent, AsyncPipe],
  templateUrl: './functionalities.component.html',
  styleUrl: './functionalities.component.scss',
})
export class FunctionalitiesComponent {
  private _functionalityService = inject(FunctionalityService);

  functionalities$ = this._functionalityService.getFunctionalities();

  functionalityTableConfig: TableConfig<Functionality>[] = [
    {
      title: 'Name',
      modelProp: 'name',
    },
    {
      title: 'Description',
      modelProp: 'description',
    },
    {
      title: 'Project',
      modelProp: 'project',
    },
    {
      title: 'Status',
      modelProp: 'status',
    },
    {
      title: 'Owner',
      modelProp: 'owner',
    },
    {
      title: 'Priority',
      modelProp: 'priority',
    },
  ];
}
