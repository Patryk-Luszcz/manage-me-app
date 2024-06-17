import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _url = environment.baseUrl;
  private _httpClient = inject(HttpClient);

  public getUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>(`${this._url}/users`);
  }
}
