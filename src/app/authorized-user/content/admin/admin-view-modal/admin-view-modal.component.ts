import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from '../../../../../shared/components/modals/modal/modal.component';

@Component({
  selector: 'app-admin-view-modal',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './admin-view-modal.component.html',
  styleUrl: './admin-view-modal.component.scss',
})
export class AdminViewModalComponent {
  modalData = inject(MAT_DIALOG_DATA);
}
