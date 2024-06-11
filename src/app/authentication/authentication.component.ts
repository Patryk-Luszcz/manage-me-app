import { Component, OnInit, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [
    MatFormFieldModule,
    RouterModule,
    MatInputModule,
    NgIf,
    LoginComponent,
    RegistrationComponent,
  ],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss',
})
export class AuthenticationComponent implements OnInit {
  isLoginPath: boolean = true;

  loginForm = this._formBuilder.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  private _authenticationService = inject(AuthenticationService);
  private _router = inject(Router);

  constructor(private _formBuilder: FormBuilder) {}

  public ngOnInit() {
    this.isLoginPath = this._router.url === '/login';
  }

  public onAuthentication({ form, endpointUrl }: any) {
    this._authenticationService.authentication(endpointUrl, form).subscribe();
  }
}
