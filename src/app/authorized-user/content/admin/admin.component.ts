import { Component, inject } from '@angular/core';
import { TableComponent, TableConfig } from '../../../../shared/components/table/table.component';
import { AsyncPipe } from '@angular/common';
import { User } from '../../../../shared/interfaces/user.interface';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TableComponent, AsyncPipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  private _userService = inject(UserService);

  users$ = this._userService.getUsers();

  userTableConfig: TableConfig<User>[] = [
    {
      title: 'First Name',
      modelProp: 'firstName',
    },
    {
      title: 'Last Name',
      modelProp: 'lastName',
    },
    {
      title: 'Login',
      modelProp: 'login',
    },
    {
      title: 'Role',
      modelProp: 'role',
      computeValue: ({ role }) => role.name,
    },
  ];

}
