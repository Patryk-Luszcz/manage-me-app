import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TableComponent, TableConfig } from '../../table/table.component';
import { Notification } from '../../../interfaces/notification.interface';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-notifications-modal',
  standalone: true,
  imports: [TableComponent, ModalComponent],
  templateUrl: './notifications-modal.component.html',
  styleUrl: './notifications-modal.component.scss',
})
export class NotificationsModalComponent {
  public modalData = inject(MAT_DIALOG_DATA);
  private _modalRef = inject(MatDialogRef);

  projectsTableConfig: TableConfig<Notification>[] = [
    {
      title: 'TaskName',
      modelProp: 'taskName',
    },
    {
      title: 'Message',
      modelProp: 'message',
    },
    {
      title: 'Priority',
      modelProp: 'priority',
    },
    {
      title: 'Assigned Users',
      modelProp: 'assignedUsers',
    },
  ];
}
