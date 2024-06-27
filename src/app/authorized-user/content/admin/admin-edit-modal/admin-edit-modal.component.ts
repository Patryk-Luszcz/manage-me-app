import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ModalComponent } from '../../../../../shared/components/modals/modal/modal.component';
import { UsersConstants } from '../../../../../shared/constants/users.constants';
import { NgFor, NgIf } from '@angular/common';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-admin-edit-modal',
  standalone: true,
  imports: [
    ModalComponent,
    MatInputModule,
    MatLabel,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    NgFor,
    NgIf,
    TitleCasePipe,
  ],
  templateUrl: './admin-edit-modal.component.html',
  styleUrl: './admin-edit-modal.component.scss',
})
export class AdminEditModalComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  public modalData = inject(MAT_DIALOG_DATA);
  private _modalRef = inject(MatDialogRef);

  userRoles = UsersConstants.usersRoles;

  userForm = this._formBuilder.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    role: ['', Validators.required],
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  public ngOnInit(): void {
    console.log(this.modalData.user);

    if (this.modalData.user) {
      const { firstName, lastName, role, login, password } = this.modalData.user;

      this.userForm.patchValue({
        firstName: firstName,
        lastName: lastName,
        role: role.name,
        login: login,
        password: password,
      });
    }
  }

  public saveUser() {
    if (this.userForm.invalid) return;

    const { role, ...rest } = this.userForm.getRawValue();

    const payload: any = {
      role: {
        name: role,
      },
      ...rest,
    };

    if (this.modalData.user) {
      payload.id = this.modalData.user.id;
    }

    this._modalRef.close(payload);
  }
}
