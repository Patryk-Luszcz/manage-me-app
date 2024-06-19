import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class FunctionalityService {
  private _url = environment.baseUrl;

  private _httpClient = inject(HttpClient);

  public getFunctionalities() {
    return this._httpClient.get(`${this._url}/functionalities`);
  }
}
