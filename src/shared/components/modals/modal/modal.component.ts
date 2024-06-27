import { Component, inject, input, output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';
import { SanitizeTitlePipe } from '../../../pipes/sanitize-title.pipe';

@Component({
  selector: 'shared-modal',
  standalone: true,
  imports: [MatTooltip, SanitizeTitlePipe],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  modalTitle = input.required<string>();
  confirm = output<void>();
  isFooterVisible = input<boolean>(true);

  private _modalRef = inject(MatDialogRef);

  public confirmModal(): void {
    this.confirm.emit();
  }

  public cancelModal(): void {
    this._modalRef.close(null);
  }
}
