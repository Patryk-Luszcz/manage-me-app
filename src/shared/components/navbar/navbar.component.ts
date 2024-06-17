import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  authorizationToken!: boolean;
  userLogin!: any;

  private _cookieService = inject(CookieService);

  public ngOnInit() {
    this.authorizationToken = this._cookieService.get('AuthorizationToken') ? true : false;
    this.userLogin = JSON.parse(window.localStorage.getItem('UserInfo') || '{}');
  }

  public signOut() {
    window.localStorage.removeItem('UserInfo');
    this._cookieService.delete('AuthorizationToken');

    setTimeout(() => {
      document.location.reload();
    }, 0);

    this.ngOnInit();
  }
}
