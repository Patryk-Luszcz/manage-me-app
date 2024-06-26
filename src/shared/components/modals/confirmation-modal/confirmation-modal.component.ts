import { Component, inject } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
})
export class ConfirmationModalComponent {
  public modalData = inject(MAT_DIALOG_DATA);
  private _modalRef = inject(MatDialogRef);

  public confirm() {
    this._modalRef.close(true);
  }
}
