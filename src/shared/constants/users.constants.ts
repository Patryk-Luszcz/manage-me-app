import { TableConfig } from '../components/table/table.component';
import { User } from '../interfaces/user.interface';

export abstract class UsersConstants {
  static usersRoles = [
    {
      id: 1,
      name: 'developer',
    },
    {
      id: 2,
      name: 'admin',
    },
    {
      id: 3,
      name: 'devops',
    },
  ];

  static userTableConfig: TableConfig<User>[] = [
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
