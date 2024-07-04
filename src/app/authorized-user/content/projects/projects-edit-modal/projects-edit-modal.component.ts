import { Component, OnInit, inject, signal } from '@angular/core';
import { ModalComponent } from '../../../../../shared/components/modals/modal/modal.component';
import { MatInputModule } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project } from '../../../../../shared/interfaces/project.interface';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-projects-edit-modal',
  standalone: true,
  imports: [ModalComponent, MatInputModule, MatLabel, ReactiveFormsModule, MatCheckboxModule],
  templateUrl: './projects-edit-modal.component.html',
  styleUrl: './projects-edit-modal.component.scss',
})
export class ProjectsEditModalComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private _modalRef = inject(MatDialogRef);

  modalData = inject(MAT_DIALOG_DATA);

  projectForm = this._formBuilder.nonNullable.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    active: [false],
  });

  public ngOnInit() {
    if (this.modalData.project) {
      this._updateForm(this.modalData.project);
    }
  }

  private _updateForm(project: Project) {
    this.projectForm.patchValue({
      name: project.name,
      description: project.description,
      active: project.active,
    });
  }

  public saveProject() {
    if (this.projectForm.invalid) return;

    const payload: any = {
      ...this.projectForm.getRawValue(),
    };

    if (this.modalData.project) {
      payload.id = this.modalData.project.id;
    }

    this._modalRef.close(payload);
  }
}
