import { Component, inject } from '@angular/core';
import { ModalComponent } from '../../../../../shared/components/modal/modal.component';
import { MatInputModule } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-projects-edit-modal',
  standalone: true,
  imports: [ModalComponent, MatInputModule, MatLabel, ReactiveFormsModule],
  templateUrl: './projects-edit-modal.component.html',
  styleUrl: './projects-edit-modal.component.scss',
})
export class ProjectsEditModalComponent {
  private _formBuilder = inject(FormBuilder);
  private _modalRef = inject(MatDialogRef);

  modalData = inject(MAT_DIALOG_DATA);

  projectForm = this._formBuilder.nonNullable.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  public saveProject() {
    if (this.projectForm.invalid) return;

    this._modalRef.close(this.projectForm.getRawValue());
  }
}
