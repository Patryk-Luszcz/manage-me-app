import { Component, inject } from '@angular/core';
import { ModalComponent } from '../../../../../shared/components/modals/modal/modal.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-functionalities-view-modal',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './functionalities-view-modal.component.html',
  styleUrl: './functionalities-view-modal.component.scss',
})
export class FunctionalitiesViewModalComponent {
  modalData = inject(MAT_DIALOG_DATA);
}
