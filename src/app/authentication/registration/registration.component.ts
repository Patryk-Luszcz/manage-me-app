import { Component, output } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [MatFormFieldModule, RouterModule, MatInputModule, NgIf, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  signUp = output<any>();

  registrationForm = this._formBuilder.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    login: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder) {}

  public registration() {
    if (this.registrationForm.valid) {
      this.signUp.emit({ form: this.registrationForm.getRawValue(), endpointUrl: 'register' });
    }
  }
}
