import { Component, output } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, RouterModule, MatInputModule, NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  signIn = output<any>();

  loginForm = this._formBuilder.nonNullable.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder) {}

  public login() {
    if (this.loginForm.valid) {
      this.signIn.emit({ form: this.loginForm.getRawValue(), endpointUrl: 'login' });
    }
  }
}
