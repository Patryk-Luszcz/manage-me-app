import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from '../../../../../shared/components/modals/modal/modal.component';

@Component({
  selector: 'app-tasks-info-modal',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './tasks-info-modal.component.html',
  styleUrl: './tasks-info-modal.component.scss',
})
export class TasksInfoModalComponent {
  modalData = inject(MAT_DIALOG_DATA);
}
