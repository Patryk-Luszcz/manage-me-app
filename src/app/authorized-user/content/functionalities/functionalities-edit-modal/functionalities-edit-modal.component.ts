import { Component, OnInit, inject } from '@angular/core';
import { ModalComponent } from '../../../../../shared/components/modals/modal/modal.component';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StatusConstants } from '../../../../../shared/constants/status.constants';
import { PriorityConstants } from '../../../../../shared/constants/priority.constansts';
import { MatSelectModule } from '@angular/material/select';
import { Functionality } from '../../../../../shared/interfaces/functionality.inteface';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-functionalities-edit-modal',
  standalone: true,
  imports: [
    ModalComponent,
    MatInputModule,
    MatLabel,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    TitleCasePipe,
  ],
  templateUrl: './functionalities-edit-modal.component.html',
  styleUrl: './functionalities-edit-modal.component.scss',
})
export class FunctionalitiesEditModalComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private _modalRef = inject(MatDialogRef);
  public modalData = inject(MAT_DIALOG_DATA);

  public statuses = StatusConstants.statuses;
  public priorities = PriorityConstants.priorities;

  public functionalityForm = this._formBuilder.nonNullable.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    status: ['', Validators.required],
    project: [{ value: this.modalData.activeProject.name, disabled: true }, Validators.required],
    owner: ['', Validators.required],
    priority: ['', Validators.required],
  });

  public ngOnInit() {
    if (this.modalData.functionality) {
      this._updateForm(this.modalData.functionality);
    }
  }

  private _updateForm(functionality: Functionality) {
    this.functionalityForm.patchValue({
      name: functionality.name,
      status: functionality.status,
      owner: functionality.owner,
      priority: functionality.priority,
      description: functionality.description,
    });
  }

  public saveFunctionality() {
    if (this.functionalityForm.invalid) {
      return;
    }

    const payload: any = {
      projectId: this.modalData.activeProject.id,
      ...this.functionalityForm.getRawValue(),
    };

    if (this.modalData.functionality) {
      payload.id = this.modalData.functionality.id;
    }

    this._modalRef.close(payload);
  }
}
