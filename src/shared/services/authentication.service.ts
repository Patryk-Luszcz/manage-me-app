import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _url = environment.baseUrl;

  private _httpClient = inject(HttpClient);
  private _cookieService = inject(CookieService);

  public authentication<T>(endpointUrl: string, form: T): Observable<User> {
    return this._httpClient.post<User>(`${this._url}/users/${endpointUrl}`, form).pipe(
      tap((userInfo) => {
        const { authorizationToken, ...userDetails } = userInfo;

        this._cookieService.set('AuthorizationToken', userInfo.authorizationToken);
        window.localStorage.setItem('UserInfo', JSON.stringify(userDetails));
      })
    );
  }
}
