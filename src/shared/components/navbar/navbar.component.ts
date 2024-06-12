import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  authorizationToken!: boolean;
  userLogin!: any;

  constructor(private _cookieService: CookieService) {}

  public ngOnInit(): void {
    this.authorizationToken = this._cookieService.get('AuthorizationToken') ? true : false;
    this.userLogin = JSON.parse(window.localStorage.getItem('UserInfo') || '{}');
  }

  public signOut(): void {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('order');

    this._cookieService.delete('AuthorizationToken');

    setTimeout(() => {
      document.location.reload();
    }, 0);

    this.ngOnInit();
  }
}
