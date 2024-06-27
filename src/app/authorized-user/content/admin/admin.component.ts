import { Component, OnInit, inject } from '@angular/core';
import { TableComponent, TableConfig } from '../../../../shared/components/table/table.component';
import { AsyncPipe } from '@angular/common';
import { User } from '../../../../shared/interfaces/user.interface';
import { UserService } from '../../../../shared/services/user.service';
import { MatTooltip } from '@angular/material/tooltip';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProjectService } from '../../../../shared/services/project.service';
import { ActionsStrategyService } from '../../../../shared/services/actions-strategy/actions-strategy.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UsersConstants } from '../../../../shared/constants/users.constants';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TableComponent, AsyncPipe, MatTooltip],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  private _userService = inject(UserService);
  private _projectService = inject(ProjectService);
  private _actionsStrategyService = inject(ActionsStrategyService);
  private _usersService = inject(UserService);
  private _modal = inject(MatDialog);

  userTableConfig = UsersConstants.userTableConfig;

  users$!: Observable<User[]>;
  activeProject = toSignal(this._projectService.getActiveProject());

  public ngOnInit() {
    this._getUsers();
  }

  public handleOperationType({ actionType, item }: { actionType: string; item: User }) {
    const action = `${actionType}_USER`;
    const component = this._actionsStrategyService.actionStrategyHandler(action);

    const modalRef = this._modal.open(component, {
      data: {
        title: action,
        activeProject: this.activeProject(),
        user: item,
        isNewUser: actionType === 'ADD' ? true : false,
        alertInfo: 'Are you sure you want to delete this user ?',
      },
      minWidth: '30vw',
    });

    modalRef.afterClosed().subscribe((payload) => {
      if (!payload) return;

      if (action === 'DELETE_USER') {
        this._usersService.deleteUser(item.id).subscribe({
          next: () => this._getUsers(),
          error: (error) => alert(error.message),
        });
      } else if (action === 'ADD_USER') {
        this._usersService.createUser(payload).subscribe({
          next: () => this._getUsers(),
          error: (error) => alert(error.message),
        });
      } else {
        this._usersService.updateUser(payload).subscribe({
          next: () => this._getUsers(),
          error: (error) => alert(error.message),
        });
      }
    });
  }

  private _getUsers() {
    this.users$ = this._userService.getUsers();
  }
}
