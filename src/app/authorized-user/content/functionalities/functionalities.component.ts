import { Component, OnInit, inject } from '@angular/core';
import { TableComponent, TableConfig } from '../../../../shared/components/table/table.component';
import { FunctionalityService } from '../../../../shared/services/functionality.service';
import { Functionality } from '../../../../shared/interfaces/functionality.inteface';
import { AsyncPipe } from '@angular/common';
import { ActionsStrategyService } from '../../../../shared/services/actions-strategy/actions-strategy.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';
import { ProjectService } from '../../../../shared/services/project.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-functionalities',
  standalone: true,
  imports: [TableComponent, AsyncPipe, MatTooltip],
  templateUrl: './functionalities.component.html',
  styleUrl: './functionalities.component.scss',
})
export class FunctionalitiesComponent implements OnInit {
  private _functionalityService = inject(FunctionalityService);
  private _projectService = inject(ProjectService);
  private _actionsStrategyService = inject(ActionsStrategyService);
  private _modal = inject(MatDialog);

  activeProject = toSignal(this._projectService.getActiveProject());
  functionalities$!: Observable<Functionality[]>;

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

  public ngOnInit() {
    this._getFunctionalities();
  }

  public handleOperationType({ actionType, item }: { actionType: string; item: Functionality }) {
    const action = `${actionType}_FUNCTIONALITY`;
    const component = this._actionsStrategyService.actionStrategyHandler(action);

    const modalRef = this._modal.open(component, {
      data: {
        title: action,
        activeProject: this.activeProject(),
        functionality: item,
        alertInfo: 'Are you sure you want to delete this functionality ?',
      },
      minWidth: '55vw',
    });

    modalRef.afterClosed().subscribe((payload) => {
      if (!payload) return;

      if (action === 'DELETE_FUNCTIONALITY') {
        this._functionalityService.deleteFunctionality(item.id).subscribe({
          next: () => this._getFunctionalities(),
          error: (error) => alert(error.message),
        });
      } else if (action === 'ADD_FUNCTIONALITY') {
        this._functionalityService.createFunctionality(payload).subscribe({
          next: () => this._getFunctionalities(),
          error: (error) => alert(error.message),
        });
      } else {
        this._functionalityService.updateFunctionality(payload).subscribe({
          next: () => this._getFunctionalities(),
          error: (error) => alert(error.message),
        });
      }
    });
  }

  private _getFunctionalities() {
    this.functionalities$ = this._functionalityService
      .getFunctionalities()
      .pipe(
        map((functionalities) =>
          functionalities.filter(({ projectId }) => projectId === this.activeProject()?.id)
        )
      );
  }
}
